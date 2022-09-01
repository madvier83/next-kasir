import React from "react"

export default function ItemCard() {
    return (
        <div className="select-none card card-compact border-primary-focus border-l-4 active:border-l-0 bg-primary duration-100 w-48 h-40 text-neutral-content mb-2 mr-2">
            <div className="card-body">
                <p>
                    <small>Stocks: 100</small><br />
                    <span className="text-xl font-bold">Fish and chips</span><br />
                    {/* <marquee behavior="alternate" scrollAmount="1"><span className="text-xl font-bold">Fish and chips</span></marquee><br /> */}
                    <b className="opacity-75">Rp. 3000</b>
                </p>
                <div className="card-actions justify-end">
                    <div className="flex mt-4 items-center">
                        <button className="btn btn-sm font-extrabold bg-opacity-10 border-none">-</button>
                        <b className="text-bold mx-1">0</b>
                        <button className="btn btn-sm font-extrabold bg-opacity-10 border-none">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}