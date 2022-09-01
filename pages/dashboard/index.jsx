import React from "react"
import Drawer from "../../components/Drawer"
import Navbar from "../../components/Navbar"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Dashboard() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Navbar/>
            <Drawer>
                <div className="flex flex-wrap">

                    <div className="p-4">
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Welcome!</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, quibusdam.</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>router.push("stocks")}>Stocks</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Manage Order</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, quibusdam.</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>router.push("order")}>Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">View Order History</h2>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, quibusdam.</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>router.push("history")}>History</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}