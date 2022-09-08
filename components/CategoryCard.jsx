import React from 'react'

export default function CategoryCard({ title, id, filterItems }) {
    return (
        <>
            <div
                className="flex items-center btn btn-success btn-sm mx-1 mb-2 w-36 select-none cursor-pointer group"
                onClick={() => filterItems && filterItems(id)}
            >
                <div className="flex items-center mx-4 my-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                    <span className='truncate'>{title}</span>
                </div>
            </div>
        </>
    )
}
