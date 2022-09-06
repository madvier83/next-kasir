import React, { useEffect, useState } from "react"
import Drawer from "../../components/Drawer"
import Navbar from "../../components/Navbar"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Dashboard() {
    const router = useRouter()
    const firstSetup = {
        categories: false,
        items: false,
        order: false,
        history: false,
    }
    const [stargazer, setStargazer] = useState(0)

    const [setup, setSetup] = useState(firstSetup)
    const [progress, setProgress] = useState(0)

    function constructor() {
        let categories = JSON.parse(window.localStorage.getItem("categories"))
        if(categories===null) {
            categories = []
            window.localStorage.setItem("categories", JSON.stringify(categories))
            categories = JSON.parse(window.localStorage.getItem("categories"))
        }
        if(categories?.length>0) {
            setSetup(prev=>{return{...prev, categories: true}})
        }

        let items = JSON.parse(window.localStorage.getItem("items"))
        if(items===null) {
            items = []
            window.localStorage.setItem("items", JSON.stringify(items))
            items = JSON.parse(window.localStorage.getItem("items"))
        }
        if(items?.length>0) {
            setSetup(prev=>{return{...prev, items: true}})
        }

        let history = JSON.parse(window.localStorage.getItem("history"))
        if(history===null) {
            history = []
            window.localStorage.setItem("history", JSON.stringify(history))
            history = JSON.parse(window.localStorage.getItem("history"))
        }
        if(history?.length>0) {
            setSetup(prev=>{return{...prev, history: true}})
        }

        checkProgress()
    }
    function checkProgress() {
        let current = 0
        if(setup.categories){current+=25}
        if(setup.items){current+=25}
        if(setup.order){current+=25}
        if(setup.history){current+=25}
        console.log(current)
        setProgress(current)
    }
    useEffect(()=>{
        checkProgress()
    },[setup])
    useEffect(()=>{
        constructor()
        // async function getStar() {
        //     let star = await fetch("https://api.github.com/repos/madvier83/next-kasir/stargazers")
        //     .then(res => res.json)
        //     .then(data => document.body.append())
        //     console.log(star)
        //     setStargazer(star.body.length)
        // }
        // getStar()
    },[])

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Navbar/>
            <Drawer>
                <div className="stats shadow m-4 mb-8 flex flex-col md:flex-row max-w-4xl">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">GitHub Stars</div>
                        <div className="stat-value text-primary">{stargazer}</div>
                        <div className="stat-desc">0% more than last month</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">0.0M</div>
                        <div className="stat-desc">0% more than last month</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                        <div className="avatar online">
                            <div className="w-16 mask mask-hexagon">
                            <img src="https://avatars.githubusercontent.com/u/54396887?v=4" />
                            </div>
                        </div>
                        </div>
                        <div className="stat-value">100%</div>
                        <div className="stat-title">Free & Open Source</div>
                        <a target="_blank" href="https://github.com/madvier83/next-kasir" className="stat-desc text-secondary">View On GitHub</a>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap m-4 max-w-4xl">

                    <div className="p-2 w-full h-58 lg:w-2/3">
                        <div className="card w-full shadow-xl image-full bg-primary">
                            <div className="card-body">
                                <h2 className="card-title">Welcome!</h2>
                                <p>Welcome to CookiePOS, a free and open source point of sales app!</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary mt-4" onClick={()=>router.push("items")}>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 w-full h-58">
                        <div className="card w-full h-full shadow-xl image-full">
                            <div className="card-body">
                                <div className="flex">

                                    <div className="mx-auto lg:ml-4 radial-progress text-success" style={{"--value":progress, "--size": "10rem", "--thickness": "5px"}}>{progress}%</div>

                                    <div className="mx-auto">
                                        <p className="text-xl font-semibold mb-2">Setup Progress</p>

                                        <div className="flex items-center mb-2">
                                            <input type="checkbox" className="checkbox mr-2" checked={setup.categories&&"checked"} disabled/>
                                            <p className={`text-sm opacity-50 ${setup.categories&&"text-success opacity-70"}`}>Set Categories</p> 
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <input type="checkbox" className="checkbox mr-2" checked={setup.items&&"checked"} disabled />
                                            <p className={`text-sm opacity-50 ${setup.items&&"text-success opacity-70"}`}>Add Items</p> 
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <input type="checkbox" className="checkbox mr-2" checked={setup.history&&"checked"} disabled />
                                            <p className={`text-sm opacity-50 ${setup.history&&"text-success opacity-70"}`}>Take Orders</p> 
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" className="checkbox mr-2" checked={setup.orders&&"checked"} disabled />
                                            <p className={`text-sm opacity-50 ${setup.orders&&"text-success opacity-70"}`}>View History</p> 
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