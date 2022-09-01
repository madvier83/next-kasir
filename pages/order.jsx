import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import ItemCard from "../components/ItemCard"
import CategoryCard from "../components/CategoryCard"
import Head from "next/head"
import { nanoid } from "nanoid"

export default function Order() {
    const [categories, setCategories] = useState()

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
    useEffect(()=>{
        categoriesInit()
    },[])

    const categoryList = categories?.map(cat=>{
        return(
            <CategoryCard 
                key={cat.id}
                title={cat.category} 
                id={cat.id}
            />
        )
    })
    return (
        <>
            <Head>
                <title>Order</title>
            </Head>

            <Navbar/>
            <Drawer>
                <div className="p-2 flex">
                    <div className="flex flex-col w-[80vw] h-full m-2">
                        <h1 className="text-2xl font-bold text-base-content pt-2 pb-6 pl-2">Category</h1>
                        <div className="flex flex-wrap">

                            {categoryList}

                        </div>
                        {/* <div className="divider px-2"></div> */}
                        <h1 className="text-2xl font-bold text-base-content pt-2 pb-6 pl-2">Items</h1>
                        <div className="flex flex-wrap">
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                            <ItemCard></ItemCard>
                        </div>
                    </div>

                    <div className="flex mt-2 mr-2">
                        <div className="card bg-base-300 text-neutral-content shadow-xl">
                            <div className="card-body min-h-[240px] lg:min-h-[480px] w-80 relative">
                                <div className="flex place-items-end justify-between">
                                    <b className="card-title">Order</b>
                                    {/* <small className="text-xs opacity-50 mb-1">ID: {id}</small> */}
                                </div>
                                <div className="divider"></div>
                                <div className="flex">
                                    <p>Aqua 200ml <span className="text-base-content">x1</span></p>
                                    <b>Rp. 5000</b>
                                </div>
                                <div className="flex">
                                    <p>Aqua 1000ml <span className="text-base-content">x1</span></p>
                                    <b>Rp. 10000</b>
                                </div>
                                <div className="divider"></div>

                                <div className="flex justify-between">
                                    <b className="card-title">Total</b>
                                    <b className="card-title">Rp. 15000</b>
                                </div>
                                <div className="card-actions justify-end">
                                <button className="btn btn-accent absolute bottom-4">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}