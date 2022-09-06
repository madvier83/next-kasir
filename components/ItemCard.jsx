import React, { useState } from "react"

export default function ItemCard({item, addOrder, removeOrder, qty}) {
    return (
        <div className="select-none card card-compact border-primary-focus border-l-4 active:border-l-0 bg-primary duration-100 w-48 h-36 text-primary-content mb-2 mr-2">
            <div className=" mt-2 ml-4">
                <div 
                    className=""
                    onClick={()=>{
                        addOrder&&addOrder(item)
                    }}
                >
                        <small className="opacity-60 font-semibold text-xs">Stock: {item.stock}</small><br />
                        <span className="text-2xl font-bold">{item.item}</span><br />
                        <b className="opacity-50">Rp. {item.price}</b>
                </div>
            </div>

            {(addOrder&&removeOrder)&&

                <div className="flex justify-end">
                    <div className="flex mt-3 mr-3 items-center">
                        <button 
                            className="btn bg-primary-focus bg-opacity-50 btn-sm hover:bg-primary-focus font-extrabold border-none"
                            onClick={()=>{
                                removeOrder(item)
                            }}
                            >-</button>
                        <b className="text-bold mx-1">{qty}</b>
                        <button 
                            className="btn bg-primary-focus bg-opacity-50 hover:bg-primary-focus btn-sm font-extrabold border-none"
                            onClick={()=>{
                                addOrder(item)
                            }}
                        >+</button>
                    </div>
            </div>}
        </div>
    )
}