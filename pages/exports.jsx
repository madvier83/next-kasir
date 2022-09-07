import React, { useEffect, useState } from 'react'
import GlobalDataProvider from '../components/GlobalDataProvider'
import Head from 'next/head'
import * as XLSX from 'xlsx'

export default function Exports() {
    const [history, setHistory] = useState([])
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    function constructor() {
        let history = JSON.parse(window.localStorage.getItem('history'))
        setHistory(history)
        let items = JSON.parse(window.localStorage.getItem('items'))
        setItems(items)
        let categories = JSON.parse(window.localStorage.getItem('categories'))
        setCategories(categories)
    }
    useEffect(() => {
        constructor()
    }, [])

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
        const fileName = 'CookiePOS ' + date + '.json'
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
    return (
        <>
            <Head>
                <title>CookiePOS | Exports</title>
            </Head>
            <GlobalDataProvider>
                <div>
                    <div className="flex flex-col lg:w-[80vw] h-full">
                        <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-6">
                            Categories & Items
                        </h1>
                        {/* <button
                            onClick={() => downloadExcel()}
                            className="btn btn-sm btn-success shadow-lg mb-2 ml-4 w-44 select-none hover:animate-pulse"
                        >
                            <span>Download .xlsx</span>
                        </button> */}
                        <button
                            onClick={() => downloadJson({categories, items})}
                            className="btn btn-sm btn-warning shadow-lg mb-2 ml-4 w-44 select-none hover:animate-pulse"
                            >
                            <span>Download .json</span>
                        </button>
                    </div>
                    <div className="flex flex-col lg:w-[80vw] h-full">
                        <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-6">
                            Order History
                        </h1>
                        <button
                            onClick={() => downloadExcel(historyItemStringify())}
                            className="btn btn-sm btn-success shadow-lg mb-2 ml-4 w-44 select-none hover:animate-pulse"
                        >
                            <span>Download .xlsx</span>
                        </button>
                        <button
                            onClick={() => downloadJson(history)}
                            className="btn btn-sm btn-warning shadow-lg mb-2 ml-4 w-44 select-none hover:animate-pulse"
                            >
                            <span>Download .json</span>
                        </button>
                    </div>
                </div>
            </GlobalDataProvider>
        </>
    )
}
