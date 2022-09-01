import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Drawer({children}) {
    const router = useRouter()
    // console.log(router)
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {children}
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                    <ul className="menu p-4 overflow-y-auto w-48 bg-base-300 text-base-content">
                    <li className={`${router.pathname === "/dashboard" && "activeDrawer"} `}><Link href={"dashboard"}>Dashboard</Link></li>
                    <li className={`${router.pathname === "/order" && "activeDrawer"} `}><Link href={"order"}>Order</Link></li>
                    <li className={`${router.pathname === "/items" && "activeDrawer"} `}><Link href={"items"}>Items</Link></li>
                    <li className={`${router.pathname === "/history" && "activeDrawer"} `}><Link href={"history"}>History</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}