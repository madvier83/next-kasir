import React from 'react'
import { useRouter } from 'next/router'

export default function ItemCard({ item, addOrder, removeOrder, qty }) {
    const router = useRouter()
    return (
        <div
            className={`${
                item.stock > 0 ? 'opacity-100' : 'opacity-50'
            } bg-primary text-primary-content border-primary-focus select-none card card-compact border-l-4 active:border-l-0 duration-100 w-36 lg:w-40 h-32 mb-2 mx-1 group relative cursor-pointer`}
        >
            <div className=" mt-2 mx-3 w-[85%] overflow-hidden">
                <div
                    className=""
                    onClick={() => {
                        addOrder && addOrder(item)
                    }}
                >
                    <small
                        onClick={() => router.push('items')}
                        className={`opacity-60 font-semibold text-xs hover:opacity-100`}
                    >
                        Stock: {item.stock}
                    </small>
                    <br />
                    {item.item.length >= 12 ? (
                        <span className="text-sm font-bold truncate">
                            {item.item}
                        </span>
                    ) : (
                        <span className="text-xl font-bold truncate">
                            {item.item}
                        </span>
                    )}
                    <br />
                    <b className="opacity-50 text-sm">Rp. {item.price}</b>
                </div>
            </div>

            {addOrder && removeOrder && (
                <div className="flex absolute -right-1 bottom-2">
                    <div className="flex mt-auto mr-3 items-center">
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
