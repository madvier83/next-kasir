import React, { useEffect, useState } from 'react'
import GlobalDataProvider from '../components/GlobalDataProvider'
import Head from 'next/head'
import { useRouter } from 'next/router'
import numeral from 'numeral'

export default function Dashboard({ constructor }) {
    const router = useRouter()
    const [stargazer, setStargazer] = useState(0)
    const firstSetup = {
        categories: false,
        items: false,
        history: false,
        backup: false,
    }
    const [setup, setSetup] = useState(firstSetup)
    const [progress, setProgress] = useState(0)
    const [history, setHistory] = useState([])

    function checkProgress() {
        let categories = JSON.parse(window.localStorage.getItem('categories'))
        if (categories?.length > 0) {
            setSetup((prev) => {
                return { ...prev, categories: true }
            })
        }
        let items = JSON.parse(window.localStorage.getItem('items'))
        if (items?.length > 0) {
            setSetup((prev) => {
                return { ...prev, items: true }
            })
        }
        let history = JSON.parse(window.localStorage.getItem('history'))
        if (history?.length > 0) {
            setSetup((prev) => {
                return { ...prev, history: true }
            })
            setHistory(history)
        }
        let backup = window.localStorage.getItem('backup')
        if (backup === 'ok') {
            setSetup((prev) => {
                return { ...prev, backup: true }
            })
        }
    }

    function countProgress() {
        let current = 0
        if (setup.categories) {
            current += 25
        }
        if (setup.items) {
            current += 25
        }
        if (setup.history) {
            current += 25
        }
        if (setup.backup && setup.history) {
            current += 25
        }
        setProgress(current)
    }
    useEffect(()=>{
        countProgress()
    }, [setup])

    function getItemsSold() {
        let items = 0
        let balance = 0
        for (let i = 0; i < history.length; i++) {
            items += history[i].qtys
            balance += history[i].totals
        }
        return { items, balance }
    }
    useEffect(() => {
        checkProgress()
        constructor()
    }, [])

    useEffect(() => {
        async function getStar() {
            let star = await fetch("https://api.github.com/repos/madvier83/next-kasir")
            star = await star.json()
            setStargazer(star.stargazers_count)
        }
        getStar()
    }, [])

    return (
        <>
            <Head>
                <title>CookiePOS | Dashboard</title>
            </Head>
            <GlobalDataProvider>
                <div className="flex flex-col">
                    
                    <div className={`flex ${setup.history?"flex-col-reverse":"flex-col"}`}>

                        <div className="m-4 mb-8 flex flex-col md:flex-row max-w-4xl select-none">

                            <div className="stat">
                                <div className="stat-figure text-primary">

                                    <a href="https://github.com/madvier83/next-kasir" target="_blank" rel='noreferrer'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block w-8 h-8 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <div className="stat-title">GitHub Stars</div>
                                    <div className="stat-value text-primary">
                                        {stargazer}
                                    </div>
                                <div className="stat-desc">0% more than last month</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block w-8 h-8 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="stat-title">Page Views</div>
                                <div className="stat-value text-secondary">0.1K</div>
                                <div className="stat-desc">0% more than last month</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar online">
                                        <a href="https://github.com/madvier83" target="_blank" rel="noreferrer">
                                            <div className="w-16 mask mask-circle">
                                                <img src="https://avatars.githubusercontent.com/u/54396887?v=4" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="stat-value">100%</div>
                                <div className="stat-title">Free & Open Source</div>
                                <a
                                    target="_blank"
                                    href="https://github.com/madvier83/next-kasir"
                                    rel="noreferrer"
                                    className="stat-desc text-secondary"
                                >
                                    View On GitHub
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-wrap md:flex-nowrap mx-2 mt-4 md:m-4 max-w-4xl">
                            {!setup?.history ? (
                                <div className="w-full h-58 lg:w-2/3">
                                    <div className="card w-full image-full bg-primary">
                                        <div className="card-body">
                                            <h2 className="card-title">Welcome!</h2>
                                            <p>
                                                Welcome to CookiePOS, a free and open
                                                source point of sales app!
                                            </p>
                                            <div className="card-actions justify-end">
                                                <button
                                                    className="btn btn-primary mt-4"
                                                    onClick={() => router.push('items')}
                                                >
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full">
                                    <div className="rounded-xl w-full bg-primary text-primary-content ">
                                        <div className="flex flex-row justify-center py-12">
                                            <div className="mx-1 md:mx-4">
                                                <div className="stat-title">
                                                    Items Sold
                                                </div>
                                                <div className="stat-value flex items-center py-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={2.2}
                                                        stroke="currentColor"
                                                        className="w-9 h-9 mr-2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                                        />
                                                    </svg>
                                                    <h2>{getItemsSold().items}</h2>
                                                </div>
                                                <div className="stat-actions">
                                                    <button
                                                        className="btn btn-sm btn-neutral"
                                                        onClick={() =>
                                                            router.push('items')
                                                        }
                                                    >
                                                        Manage Stock
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mx-1 md:mx-4">
                                                <div className="stat-title">
                                                    Income
                                                </div>
                                                <div className="stat-value py-1">
                                                    Rp.
                                                    {numeral(
                                                        getItemsSold().balance
                                                    ).format('0,a')}
                                                </div>
                                                <div className="stat-actions">
                                                    <button
                                                        className="btn btn-sm btn-neutral"
                                                        onClick={() =>
                                                            router.push('history')
                                                        }
                                                    >
                                                        History
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={`my-2 md:my-0 md:ml-4 w-full h-full ${progress==100&&"opacity-40"}`}>
                                <div className="card w-full image-full card-compact">
                                    <div className="card-body bg-base-300">
                                        <div className="flex my-4">
                                            <div
                                                className="mx-auto my-auto radial-progress text-success font-bold"
                                                style={{
                                                    '--value': progress,
                                                    '--size': '8rem',
                                                    '--thickness': '5px',
                                                }}
                                            >
                                                {progress}%
                                            </div>

                                            <div className="mx-auto ml-1 text-base-content">
                                                <p className="text-xl font-semibold mb-2 truncate">
                                                    Setup Progress
                                                </p>

                                                <div className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox mr-2"
                                                        checked={
                                                            setup.categories &&
                                                            'checked'
                                                        }
                                                        disabled
                                                    />
                                                    <p
                                                        className={`text-sm opacity-50 ${
                                                            setup.categories &&
                                                            'text-success opacity-70 cursor-pointer'
                                                        }`}
                                                        onClick={()=>router.push("items")}
                                                    >
                                                        Set Categories
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox mr-2"
                                                        checked={
                                                            setup.items && 'checked'
                                                        }
                                                        disabled
                                                    />
                                                    <p
                                                        className={`text-sm opacity-50 ${
                                                            setup.items &&
                                                            'text-success opacity-70 cursor-pointer'
                                                        }`}
                                                        onClick={()=>router.push("items")}
                                                    >
                                                        Add Items
                                                    </p>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox mr-2"
                                                        checked={
                                                            setup.history && 'checked'
                                                        }
                                                        disabled
                                                    />
                                                    <p
                                                        className={`text-sm opacity-50 ${
                                                            setup.history &&
                                                            'text-success opacity-70 cursor-pointer'
                                                        }`}
                                                        onClick={()=>router.push("order")}
                                                    >
                                                        Take Orders
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox mr-2"
                                                        checked={
                                                            setup.backup &&
                                                            setup.history &&
                                                            'checked'
                                                        }
                                                        disabled
                                                    />
                                                    <p
                                                        className={`text-sm opacity-50 ${
                                                            setup.backup &&
                                                            setup.history &&
                                                            'text-success opacity-70 cursor-pointer'
                                                        }`}
                                                        onClick={()=>router.push("exports")}
                                                    >
                                                        Backup your data
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                    <div className="mockup-code max-w-4xl mx-3 md:mx-4 mb-16 bg-base-300 text-base-content">
                        <pre data-prefix="$" className="font-semibold"><code>What's new</code></pre>
                        <pre data-prefix=">" className=""><code>V1.1 <span className='opacity-20'> - 15 Sep 2022 - </span></code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Bug Fixes</code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Mobile interface improvements</code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Restore data now has previews</code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Export history to xlsx format</code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Custom themes!</code></pre>
                        <pre data-prefix=">" className=""><code>V1.0 <span className='opacity-20'> - 7 Sep 2022 - </span></code></pre>
                        <pre data-prefix="" className="opacity-50"><code>- Welcome To CookiePOS!</code></pre>
                    </div>
                </div>
            </GlobalDataProvider>
        </>
    )
}
