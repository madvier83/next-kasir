import React, { useEffect, useState } from 'react'
import GlobalDataProvider from '../components/GlobalDataProvider'
import Head from 'next/head'
import numeral from 'numeral'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/router'

export default function History() {
    const router = useRouter()
    const [history, setHistory] = useState([])
    const [item, setItem] = useState([])
    const [detailModal, setDetailModal] = useState(false)

    function constructor() {
        let history = JSON.parse(window.localStorage.getItem('history'))
        setHistory(history)
    }
    useEffect(() => {
        constructor()
    }, [])

    // Data handler
    function deleteHistory(id) {
        const oldHistory = history
        let newHistory = []

        for (let i = 0; i < oldHistory.length; i++) {
            if (oldHistory[i].id != id) {
                newHistory.push(oldHistory[i])
            }
        }
        console.log(newHistory)
        newHistory = JSON.stringify(newHistory)
        window.localStorage.setItem('history', newHistory)
        constructor()
    }
    function openDetail(item) {
        setItem(item)
        setDetailModal(!detailModal)
    }
    // Conver items json to sting for xlsx
    function historyItemStringify() {
        let newHistory = []
        for (let i = 0; i < history.length; i++) {
            let arr = history[i]
            let items = ''
            arr.items.forEach(
                (element) =>
                    (items = items + element.item + ' x' + element.qty + ', ')
            )
            arr = {
                ...arr,
                items,
            }
            newHistory.push(arr)
        }
        return newHistory
    }
    function downloadExcel(data) {
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        const date = new Date().toLocaleString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        const fileName = 'CookiePOS History ' + date + '.xlsx'
        XLSX.writeFile(workbook, fileName)
    }
    function downloadJson(data) {
        const date = new Date().toLocaleString('en-us', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        const fileName = 'CookiePOS History ' + date + '.json'
        const jsonStr = JSON.stringify(data)
        let element = document.createElement('a')
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr)
        )
        element.setAttribute('download', fileName)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        window.localStorage.setItem('backup', 'ok')
    }

    let historyList = history?.map((obj) => {
        let itemList = ''
        obj.items.map(
            (item) => (itemList += item.item + ' x' + item.qty + ' | ')
        )

        return (
            <tr
                key={obj.id}
                className={`group hover:text-accent cursor-pointer`}
            >
                <td onClick={() => openDetail(obj)}>{obj.id}</td>
                <td onClick={() => openDetail(obj)}>{obj.date}</td>
                <td onClick={() => openDetail(obj)}>
                    <div className="flex">
                        <div className="overflow-scroll w-24 lg:w-64">
                            <div className="">{itemList}</div>
                        </div>
                        <div>
                            <p className="ml-2 bg-transparent">...</p>
                        </div>
                    </div>
                </td>
                <td onClick={() => openDetail(obj)}>
                    {numeral(obj.totals).format('0,0')}
                </td>
                <td onClick={() => openDetail(obj)}>
                    {numeral(obj.cash).format('0,0')}
                </td>
                <td onClick={() => openDetail(obj)}>
                    {numeral(obj.cash - obj.totals).format('0,0')}
                </td>
                <td>
                    <div className="flex">
                        <button
                            onClick={() => deleteHistory(obj.id)}
                            className="btn btn-xs btn-error px-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="#000000aa"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <label
                            htmlFor="detail-modal"
                            onClick={() => openDetail(obj)}
                            className="btn btn-xs btn-info ml-1"
                        >
                            Detail
                        </label>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <>
            <Head>
                <title>CookiePOS | History</title>
            </Head>
            <GlobalDataProvider>
                <div className="pt-4 flex flex-col">
                    <div className="flex flex-col lg:w-[80vw] h-full">
                        <h1 className="text-xl font-bold text-base-content pt-2 pl-6 pb-4">
                            History
                        </h1>
                    </div>

                    <label
                        onClick={() => router.push('order')}
                        className="mt-2 ml-4 btn btn-sm btn-primary shadow-lg mb-2 w-44 select-none hover:animate-pulse"
                    >
                        <span>+ Add Order</span>
                    </label>
                    {history.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra mb-64">
                                <thead>
                                    <tr>
                                        <th className="w-24">id</th>
                                        <th className="w-24">Date</th>
                                        <th>Items</th>
                                        <th className="w-24">Total</th>
                                        <th className="w-24">Cash</th>
                                        <th className="w-24">Change</th>
                                        <th className="w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{historyList}</tbody>
                            </table>
                        </div>
                    ) : (
                        <h2 className="text-neutral-content opacity-50">
                            // No History
                        </h2>
                    )}
                </div>

                {/* modal */}
                <input type="checkbox" className="modal-toggle" />
                <div
                    className={`modal modal-bottom sm:modal-middle ${
                        detailModal && 'modal-open'
                    }`}
                >
                    <div className="modal-box">
                        <div
                            id="screenshot"
                            className="card-body bg-base-300 w-80 relative flex mx-auto"
                        >
                            <div className="flex place-items-end justify-between">
                                <b className="card-title">Order</b>
                                <div>
                                    <small className="text-xs opacity-50 mb-1">
                                        {item.date}
                                    </small>
                                    <small className="text-xs opacity-50 mb-1">
                                        {' '}
                                        ID: {item.id}
                                    </small>
                                </div>
                            </div>
                            <div className="divider"></div>

                            {item.id &&
                                item.items.map((item) => (
                                    <div className="flex" key={item.id}>
                                        <p className="text-sm">{item.item}</p>
                                        <div className="flex items-center w-1/2">
                                            <small>
                                                {numeral(item.price).format(
                                                    '0,0'
                                                )}
                                                <span className="text-base-content ml-2">
                                                    {item.qty}
                                                </span>
                                            </small>
                                            <b className="text-sm ml-auto">
                                                {numeral(
                                                    item.price * item.qty
                                                ).format('0,0')}
                                            </b>
                                        </div>
                                    </div>
                                ))}

                            <div className="divider"></div>

                            <div className="flex justify-between">
                                <b className="card-title">
                                    Total {numeral(item.qtys).format('0,0')}{' '}
                                    item
                                </b>
                                <b className="card-title">
                                    {numeral(item.totals).format('0,0')}
                                </b>
                            </div>

                            <div className="flex opacity-50">
                                <p className="text-sm">Cash</p>
                                <b className="text-sm ml-auto">
                                    {item.cash
                                        ? numeral(item.cash).format('0,0')
                                        : '-'}
                                </b>
                            </div>
                            <div className="flex opacity-50 mb-4">
                                <p className="text-sm">Change</p>
                                <b className="text-sm ml-auto">
                                    {item.cash
                                        ? numeral(
                                              parseInt(item.cash) -
                                                  parseInt(item.totals)
                                          ).format('0,0')
                                        : '-'}
                                </b>
                            </div>
                        </div>

                        <div className="modal-action">
                            <label
                                onClick={() => setDetailModal((prev) => !prev)}
                                className="btn"
                            >
                                Close
                            </label>
                        </div>
                    </div>
                </div>
            </GlobalDataProvider>
        </>
    )
}
