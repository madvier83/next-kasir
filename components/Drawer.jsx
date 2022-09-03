import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Drawer({children}) {
    const router = useRouter()
    const [theme, setTheme] = useState()
    
    function themeInit() {
        if(window.localStorage.getItem("theme")===null){
            window.localStorage.setItem("theme", "night")
        }
    }
    useEffect(()=>{
        themeInit()
        setTheme(window.localStorage.getItem("theme"))
    }, [])
    function setNewTheme(newTheme) {
        window.localStorage.setItem("theme", newTheme)
        router.reload(window.location.pathname)
    }
    // console.log(router)
    return (
        <>
            <div data-theme={theme} className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {children}
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-300 text-base-content">
                        <li className={`${router.pathname === "/dashboard" && "activeDrawer"} `}><Link href={"dashboard"}><a>Dashboard</a></Link></li>
                        <li className={`${router.pathname === "/order" && "activeDrawer"} `}><Link href={"order"}><a>Order</a></Link></li>
                        <li className={`${router.pathname === "/items" && "activeDrawer"} `}><Link href={"items"}><a>Items</a></Link></li>
                        <li className={`${router.pathname === "/history" && "activeDrawer"} `}><Link href={"history"}><a>History</a></Link></li>
                        <ul className="absolute bottom-20">
                            <p className="ml-2 mb-2 p-0">Themes</p>
                            <div className="flex flex-wrap opacity-50">
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("dark")}>Dark</button>
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("night")}>Night</button>
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("forest")}>Forest</button>
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("coffee")}>Coffee</button>
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("dracula")}>Dracula</button>
                            <button className="btn btn-xs normal-case" onClick={()=>setNewTheme("corporate")}>Corporate</button>
                            </div>
                        </ul>
                    </ul>
                </div>
            </div>
        </>
    )
}