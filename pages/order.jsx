import React, { useEffect, useState } from 'react'
import GlobalDataProvider from '../components/GlobalDataProvider'
import ItemCard from '../components/ItemCard'
import CategoryCard from '../components/CategoryCard'
import Head from 'next/head'
import numeral from 'numeral'
import { nanoid } from 'nanoid'
import html2canvas from 'html2canvas'

export default function Order() {
    const initialOrder = {
        id: '',
        date: '',
        items: [],
        qtys: 0,
        totals: 0,
        cash: '',
    }
    const [orders, setOrders] = useState(initialOrder)
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [history, setHistory] = useState([])
    const [itemsFilter, setItemsFilter] = useState([])

    function constructor() {
        let categories = window.localStorage.getItem('categories')
        categories = JSON.parse(categories)
        setCategories(categories)

        let items = window.localStorage.getItem('items')
        items = JSON.parse(items)
        setItems(items)

        let history = window.localStorage.getItem('history')
        setHistory(JSON.parse(history))
    }
    useEffect(() => {
        constructor()
    }, [])

    function orderInit() {
        if (!orders.id) {
            const date = new Date().toLocaleString('en-us', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
            setOrders((prev) => {
                return { ...prev, id: nanoid(6), date }
            })
        }
    }
    function updateOrder() {
        let totals = 0
        let qtys = 0
        for (let i = 0; i < orders.items.length; i++) {
            totals += parseInt(orders.items[i].total)
            qtys += parseInt(orders.items[i].qty)
        }
        setOrders((prev) => {
            return { ...prev, qtys, totals }
        })
    }
    useEffect(() => {
        orderInit()
        updateOrder()
    }, [orders.items])

    function addOrder(item) {
        if (item.stock <= 0) {
            return
        }

        let newItem = {
            qty: 1,
            ...item,
            total: parseInt(item.price),
        }

        let newItems = []
        let isNewItem = true
        for (let i = 0; i < orders.items.length; i++) {
            if (orders.items[i].id == item.id) {
                let qty = orders.items[i].qty
                if (orders.items[i].qty < item.stock) {
                    qty += 1
                }
                let arr = {
                    ...orders.items[i],
                    qty,
                }
                arr.total = parseInt(arr.price) * parseInt(arr.qty)
                newItems.push(arr)
                isNewItem = false
            } else {
                newItems.push(orders.items[i])
            }
        }

        if (isNewItem) {
            newItems = orders.items
            newItems.push(newItem)
        }

        setOrders((prev) => {
            return {
                ...prev,
                items: newItems,
            }
        })
        updateOrder()
    }
    function removeOrder(item) {
        const newItems = []
        for (let i = 0; i < orders.items.length; i++) {
            if (orders.items[i].id == item.id) {
                let arr = {
                    ...orders.items[i],
                    qty: orders.items[i].qty - 1,
                }
                if (arr.qty > 0) {
                    arr.total = parseInt(arr.price) * parseInt(arr.qty)
                    newItems.push(arr)
                }
            } else {
                newItems.push(orders.items[i])
            }
        }
        setOrders((prev) => {
            return {
                ...prev,
                items: newItems,
            }
        })
        updateOrder()
    }
    async function submitHistory(event) {
        event.preventDefault()
        await download()

        // update item stock after purchase
        const newItem = []
        for (let i = 0; i < items.length; i++) {
            let sample = items[i]
            let item = null
            for (let j = 0; j < orders.items.length; j++) {
                if (orders.items[j].id == sample.id) {
                    item = orders.items[j]
                }
            }
            if (item) {
                let stock = parseInt(sample.stock) - parseInt(item.qty)
                newItem.push({ ...items[i], stock })
            } else {
                newItem.push({ ...items[i] })
            }
        }

        setItems(newItem)
        window.localStorage.setItem('items', JSON.stringify(newItem))

        const newHistory = history
        newHistory.unshift(orders)

        setHistory(newHistory)
        window.localStorage.setItem('history', JSON.stringify(history))

        setOrders(initialOrder)
    }
    function filterItems(filter) {
        if (items.length > 0) {
            if (filter === 'all') {
                setItemsFilter(items)
            } else {
                let arr = items?.filter(
                    (item) => JSON.parse(item.category).id === filter
                )
                setItemsFilter(arr)
            }
        }
    }
    useEffect(() => {
        filterItems('all')
    }, [items])

    async function download() {
        const canvas = await html2canvas(
            document.querySelector('#screenshot'),
            { backgroundColor: '#000000' }
        )
        canvas.style.display = 'none'
        document.body.appendChild(canvas)
        const image = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream')
        const a = document.createElement('a')
        a.setAttribute('download', `${orders.date + ' ' + orders.id} .png`)
        a.setAttribute('href', image)
        a.click()
    }
    
    const categoryList = categories?.map((cat) => (
        <CategoryCard
            key={cat.id}
            title={cat.category}
            id={cat.id}
            filterItems={filterItems}
        />
    ))
    const itemList = itemsFilter?.map((item) => {
        let qty = 0
        orders.items.forEach((obj) => {
            if (item.id === obj.id) {
                qty = obj.qty
            }
        })
        return (
            <ItemCard
                key={item.id}
                item={item}
                qty={qty}
                addOrder={addOrder}
                removeOrder={removeOrder}
            />
        )
    })
    const orderList = orders.items.map((item) => (
        <div className="flex justify-between" key={nanoid()}>
            <p className="text-sm w-1/2">{item.item}</p>
            <div className="flex items-center w-1/2">
                <small>
                    {numeral(item.price).format('0,0')}
                    <span className="text-base-content ml-2">{item.qty}</span>
                </small>
                <b className="text-sm ml-auto">
                    {numeral(item.price * item.qty).format('0,0')}
                </b>
            </div>
        </div>
    ))

    return (
        <>
            <Head>
                <title>CookiePOS | Order</title>
            </Head>
            <GlobalDataProvider>
                <div className="p-2 flex md:flex-row flex-col-reverse justify-between">
                    <div className="flex flex-col">
                        <h1 className="hidden md:block text-lg lg:text-xl font-bold text-base-content pt-4 pb-6 md:pl-4 mx-auto md:mx-0">
                            Category
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start">
                            <CategoryCard
                                title="Show All"
                                id={'all'}
                                filterItems={filterItems}
                            />
                            {categoryList}
                        </div>
                        <h1 className="hidden md:block text-lg lg:text-xl font-bold text-base-content pt-2 pb-2 md:pl-4 mx-auto md:mx-0">
                            Items
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start pt-4">
                            {itemList}
                        </div>
                    </div>

                    <div className="flex mt-2 md:mr-2">
                        <div className="mx-auto mb-8">

                            <div className="card bg-base-300 w-72 text-base-content shadow-xl">
                                {/* struct print area */}
                                <div
                                    id="screenshot"
                                    className="flex flex-col p-8 bg-base-300 relative"
                                >
                                    <div className="flex place-items-end justify-between">
                                        <b className="card-title">Order</b>
                                        <div className="flex flex-col">
                                            <small className="text-xs opacity-50 mb-1">
                                                {orders.date}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="divider"></div>

                                    {orders.items.length > 0 ? (
                                        orderList
                                    ) : (
                                        <b className="text-base-content opacity-40">
                                            No Item
                                        </b>
                                    )}

                                    <div className="divider"></div>

                                    <div className="flex justify-between">
                                        <b className="card-title">
                                            Total{' '}
                                            {numeral(orders.qtys).format('0,0')}{' '}
                                            item
                                        </b>
                                        <b className="card-title">
                                            {numeral(orders.totals).format(
                                                '0,0'
                                            )}
                                        </b>
                                    </div>

                                    <div className="flex opacity-50">
                                        <p className="text-sm">Cash</p>
                                        <b className="text-sm ml-auto">
                                            {orders.cash
                                                ? numeral(orders.cash).format(
                                                      '0,0'
                                                  )
                                                : '-'}
                                        </b>
                                    </div>
                                    <div className="flex opacity-50 mb-4">
                                        <p className="text-sm">Change</p>
                                        <b className="text-sm ml-auto">
                                            {orders.cash
                                                ? numeral(
                                                      parseInt(orders.cash) -
                                                          parseInt(
                                                              orders.totals
                                                          )
                                                  ).format('0,0')
                                                : '-'}
                                        </b>
                                    </div>
                                </div>

                                <div className="card-body bg-base-300 w-72 relative">
                                    <div className="flex flex-col">
                                        <form
                                            onSubmit={(event) =>
                                                submitHistory(event)
                                            }
                                        >
                                            <input
                                                type="text"
                                                placeholder="Cash"
                                                className="input input-sm mb-2 w-full"
                                                value={orders.cash}
                                                onChange={(event) => {
                                                    setOrders((prev) => {
                                                        return {
                                                            ...prev,
                                                            cash: event.target.value,
                                                        }
                                                    })
                                                }}
                                                // onKeyPress={(event) => {
                                                //     if (!/[0-9]/.test(event.key)) {
                                                //         event.preventDefault()
                                                //     }
                                                // }}
                                                required
                                            />
                                            <div className="flex justify-between mr-1">
                                                <div
                                                    className={`btn ${orders.qtys<=0?"btn-disabled":"btn-ghost"} w-1/2 btn-md mr-1`}
                                                    onClick={() =>
                                                        setOrders(initialOrder)
                                                    }
                                                >
                                                    Clear
                                                </div>
                                                <button className="btn btn-warning w-1/2 btn-md flex" disabled={orders.qtys<=0}>
                                                    Checkout
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </GlobalDataProvider>
        </>
    )
}
