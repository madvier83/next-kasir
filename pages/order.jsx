import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import ItemCard from "../components/ItemCard"
import CategoryCard from "../components/CategoryCard"
import Head from "next/head"
import { nanoid } from "nanoid"
import numeral from "numeral"

export default function Order() {
    const initialOrder = {
        id: "",
        date: "",
        items: [],
        qty: 0, 
        totals: 0,
        cash: "",
    }
    const [orders, setOrders] = useState(initialOrder)
    const [categories, setCategories] = useState()
    const [items, setItems] = useState()
    const [itemsFilter, setItemsFilter] = useState()

    function categoriesInit(){
        let cat = window.localStorage.getItem("categories")
        if (cat===null) {
            let categories = [{
                id: nanoid(),
                category: "General",
                icon: "default"
            }]
            categories = JSON.stringify(categories)
            window.localStorage.setItem("categories", categories)
            cat = window.localStorage.getItem("categories")
        }
        cat = JSON.parse(cat)
        setCategories(cat)
    }
    function itemInit() {
        let items = window.localStorage.getItem("items")
        if(items===null) {
            let item = []
            item = JSON.stringify(item)
            window.localStorage.setItem("items", item)
            items = window.localStorage.getItem("items")
        }
        items = JSON.parse(items)
        setItems(items)
    }

    function orderInit() {
        if(!orders.id) {
            const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            setOrders(prev=>{
                return {
                    ...prev,
                    id: nanoid(6),
                    date,
                }
            })
        }
    }

    useEffect(()=>{
        categoriesInit()
        itemInit()
        orderInit()
    },[])

    function updateOrder() {
        let totals = 0
        let qtys = 0
        for(let i=0; i<orders.items.length; i++){
            totals += parseInt(orders.items[i].total)
            qtys += parseInt(orders.items[i].qty)
        }
        setOrders(prev=>{
            return{
                ...prev,
                qtys,
                totals,
            }
        })
    }
    useEffect(()=>{
        orderInit()
        updateOrder()
    },[orders.items])
    
    function addOrder(item) {
        let newItem = {
            qty: 1,
            ...item,
            total: parseInt(item.price)
        }
        
        let newItems = []
        let isNewItem = true
        
        // console.log(orders.items[0].id = item.id)
        for(let i=0; i<orders.items.length; i++){
            if(orders.items[i].id==item.id){
                let qty = orders.items[i].qty
                if(orders.items[i].qty<item.stock){
                    qty += 1
                }
                let arr = {
                    ...orders.items[i],
                    qty
                }
                arr.total = parseInt(arr.price)*parseInt(arr.qty)
                newItems.push(arr)
                isNewItem = false
            }else{
                newItems.push(orders.items[i])
            }
        }

        if(isNewItem) {
            newItems = orders.items
            newItems.push(newItem)
        }

        setOrders(prev=>{
            return{
                ...prev,
                items: newItems
            }}
        )
        updateOrder()
    }

    function removeOrder(item) {
        const newItems = []
        for(let i=0; i<orders.items.length; i++){
            if(orders.items[i].id==item.id){
                let arr = {
                    ...orders.items[i],
                    qty: orders.items[i].qty - 1
                }
                if(arr.qty>0){
                    arr.total = parseInt(arr.price)*parseInt(arr.qty)
                    newItems.push(arr)
                }
            }else{
                newItems.push(orders.items[i])
            }
        }
        setOrders(prev=>{
            return{
                ...prev,
                items: newItems
            }}
        )
        updateOrder()
    }

    function filterItems(filter) {
        if(filter==="all"){
            setItemsFilter(items)
        }else{
            let arr = items?.filter(item=>item.category===filter)
            console.log(arr)
            setItemsFilter(arr)
        }
    }
    useEffect(()=>{
        filterItems("all")
    },[items])

    const categoryList = categories?.map(cat=>
        <CategoryCard 
            key={cat.id}
            title={cat.category} 
            id={cat.id}
            filterItems={filterItems}
        />
    )
    const itemList = itemsFilter?.map(item=> {
        let qty = 0
        orders.items.forEach(obj => {
            if(item.id===obj.id){
                qty = obj.qty
            }
        });
        return (
            <ItemCard
                key={item.id}
                item={item}
                qty={qty}
                addOrder={addOrder}
                removeOrder={removeOrder}
            />
            )
        }
    )
    const orderList = orders.items.map(item=>
        <div className="flex" key={nanoid()}>
            <p className="text-sm">{item.item}</p>
            <div className="flex items-center w-1/2">
                <small>{numeral(item.price).format("0,0")}
                    <span className="text-base-content ml-2">{item.qty}</span>
                </small>
                <b className="text-sm ml-auto">{numeral(item.price*item.qty).format("0,0")}</b>
            </div>
        </div>
    )

    return (
        <>
            <Head>
                <title>Order</title>
            </Head>

            <Navbar/>
            <Drawer>
                <div className="p-2 flex md:flex-row flex-col-reverse">
                    <div className="flex flex-col lg:w-[80vw] h-full m-2">
                        <h1 className="text-2xl font-bold text-base-content pt-2 pb-6 pl-2">Category</h1>
                        <div className="flex flex-wrap">

                        <CategoryCard 
                            title="Show All"
                            id={"all"}
                            filterItems={filterItems}
                        />
                            {categoryList}

                        </div>
                        {/* <div className="divider px-2"></div> */}
                        <h1 className="text-2xl font-bold text-base-content pt-2 pb-6 pl-2">Items</h1>
                        <div className="flex flex-wrap">
                            
                            {itemList}

                        </div>
                    </div>

                    <div className="flex mt-2 mr-2">
                        <div>

                            <div className="card bg-base-300 text-base-content shadow-xl">
                                <div className="card-body w-80 relative">

                                    <div className="flex place-items-end justify-between">
                                        <b className="card-title">Order</b>
                                        <div>
                                            <small className="text-xs opacity-50 mb-1">{orders.date}</small>
                                            <small className="text-xs opacity-50 mb-1"> ID: {orders.id}</small>
                                        </div>
                                    </div>
                                    <div className="divider"></div>

                                    {orders.items.length>0 ? orderList:<b className="text-base-content opacity-40">No Item</b>}

                                    <div className="divider"></div>

                                    <div className="flex justify-between">
                                        <b className="card-title">Total {numeral(orders.qtys).format("0,0")} item</b>
                                        <b className="card-title">{numeral(orders.totals).format("0,0")}</b>
                                    </div>

                                    <div className="flex opacity-50">
                                        <p className="text-sm">Cash</p>
                                        <b className="text-sm ml-auto">{orders.cash?numeral(orders.cash).format("0,0"):"-"}</b>
                                    </div>
                                    <div className="flex opacity-50">
                                        <p className="text-sm">Change</p>
                                        <b className="text-sm ml-auto">{orders.cash?numeral(parseInt(orders.cash)-parseInt(orders.totals)).format("0,0"):"-"}</b>
                                    </div>

                                    <div className="flex flex-col mt-12">
                                        <input 
                                            type="text" 
                                            placeholder="Cash" 
                                            className="input input-sm mb-2"
                                            value={orders.cash}
                                            onChange={event=>{
                                                setOrders(prev=>{
                                                    return {
                                                        ...prev,
                                                        cash:event.target.value
                                                    }
                                                })
                                            }}
                                        />
                                        <div className="flex justify-between">
                                            <button className="btn btn-neutral w-1/2 mr-1" onClick={()=>setOrders(initialOrder)}>Clear</button>
                                            <button className="btn btn-accent w-1/2">Checkout</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}