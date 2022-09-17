import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Drawer({children, changeTheme,  theme}) {
    const router = useRouter()

    return (
        <>
            <div data-theme={theme} className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content scroll-hide h-full pb-64">
                    {children}
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-300 text-base-content">
                        <li className={`${router.pathname === "/dashboard" && "activeDrawer"} `}><Link href={"dashboard"}><a>Dashboard</a></Link></li>
                        <li className={`${router.pathname === "/items" && "activeDrawer"} `}><Link href={"items"}><a>Items</a></Link></li>
                        <li className={`${router.pathname === "/order" && "activeDrawer"} `}><Link href={"order"}><a>Order</a></Link></li>
                        <li className={`${router.pathname === "/history" && "activeDrawer"} `}><Link href={"history"}><a>History</a></Link></li>
                        <li className={`${router.pathname === "/settings" && "activeDrawer"} `}><Link href={"settings"}><a>Settings</a></Link></li>
                        <ul className="absolute bottom-20 ml-2">
                            <a href="https://github.com/madvier83" target="_blank" rel="noreferrer" className="ml-2 mb-2 p-0 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2 bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>    
                                GitHub
                            </a>
                            <div className="divider w-36 text-xs">Themes</div>
                            <div className="flex flex-wrap opacity-50 w-36">
                            <button className="w-5 h-5 rounded-full border-0 bg-[#3ABFF8] border-[#0F1729] m-1" onClick={()=>changeTheme("night")} title="Night"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#4B6BFB] border-[#FFFFFF] m-1" onClick={()=>changeTheme("corporate")} title="Corporate"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#641AE6] border-[#2A303C] m-1" onClick={()=>changeTheme("dark")} title="Dark"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#FF7AC6] border-[#272935] m-1" onClick={()=>changeTheme("dracula")} title="Dracula"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#E779C1] border-[#2D1B69] m-1" onClick={()=>changeTheme("synthwave")} title="Synthwave"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#1EB854] border-[#171212] m-1" onClick={()=>changeTheme("forest")} title="Forest"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#F28C18] border-[#212121] m-1" onClick={()=>changeTheme("halloween")} title="Halloween"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#DC944C] border-[#211720] m-1" onClick={()=>changeTheme("coffee")} title="Coffee"></button>
                            <button className="w-5 h-5 rounded-full border-0 bg-[#343232] border-[#000000] m-1" onClick={()=>changeTheme("black")} title="Black"></button>
                            </div>
                        </ul>
                    </ul>
                </div>
            </div>
        </>
    )
}