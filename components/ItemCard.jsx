import React, { useState } from 'react'

export default function ItemCard({ item, addOrder, removeOrder, qty }) {
    return (
        <div className="select-none card card-compact border-primary-focus border-l-4 active:border-l-0 bg-primary duration-100 w-36 md:w-40 h-32 text-primary-content mb-2 mx-1">
            <div className=" mt-2 ml-4">
                <div
                    className=""
                    onClick={() => {
                        addOrder && addOrder(item)
                    }}
                >
                    <small className="opacity-60 font-semibold text-xs">
                        Stock: {item.stock}
                    </small>
                    <br />
                    <span className="text-xl font-bold">{item.item}</span>
                    <br />
                    <b className="opacity-50 text-sm">Rp. {item.price}</b>
                </div>
            </div>

            {addOrder && removeOrder && (
                <div className="flex justify-end">
                    <div className="flex mt-1 mr-3 items-center">
                        <button
                            className="btn text-primary-content bg-primary-focus bg-opacity-50 btn-sm hover:bg-primary-focus font-extrabold border-none"
                            onClick={() => {
                                removeOrder(item)
                            }}
                        >
                            -
                        </button>
                        <b className="text-bold mx-1">{qty}</b>
                        <button
                            className="btn  text-primary-content bg-primary-focus bg-opacity-50 hover:bg-primary-focus btn-sm font-extrabold border-none"
                            onClick={() => {
                                addOrder(item)
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
