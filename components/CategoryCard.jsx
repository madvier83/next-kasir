import React from "react"

export default function CategoryCard({title, id, categoryDelete}) {
    return (
        <>
            <div className="flex justify-between shadow-lg mb-2 mr-2 w-48 h-14 text-accent-content bg-accent border-accent-focus rounded-2xl border-l-4 active:border-l-0 duration-100 select-none cursor-pointer group">
                <div className="flex mx-4 my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>{title}</span>
                </div>
                {categoryDelete &&
                    <div className="relative my-auto mr-2">
                        <button className="btn btn-xs btn-error absolute right-0 -top-3 lg:hidden group-hover:block duration-100" onClick={()=>categoryDelete(id)}>
                            Delete
                        </button>
                    </div>
                }
            </div>
        </>
    )
}