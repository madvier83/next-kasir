import React, {useEffect, useState} from "react"
import { useRouter } from "next/router"

export default function Navbar({theme}) {
    const router = useRouter()
    return (
        <>
            <div data-theme={theme} className="navbar bg-neutral text-base flex justify-between">
                <div className="flex text-neutral-content">
                    <button className="btn normal-case text-xl ml-1" onClick={()=>router.push("/")}>
                        <svg className="w-6 fill-primary mr-1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M494.6 255.9c-65.63-.8203-118.6-54.14-118.6-119.9c-65.74 0-119.1-52.97-119.8-118.6c-25.66-3.867-51.8 .2346-74.77 12.07L116.7 62.41C93.35 74.36 74.36 93.35 62.41 116.7L29.6 181.2c-11.95 23.44-16.17 49.92-12.07 75.94l11.37 71.48c4.102 25.9 16.29 49.8 34.81 68.32l51.36 51.39C133.6 466.9 157.3 479 183.2 483.1l71.84 11.37c25.9 4.101 52.27-.1172 75.59-11.95l64.81-33.05c23.32-11.84 42.31-30.82 54.14-54.14l32.93-64.57C494.3 307.7 498.5 281.4 494.6 255.9zM176 367.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S193.6 367.1 176 367.1zM208 208c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S225.6 208 208 208zM368 335.1c-17.62 0-32-14.37-32-31.1s14.38-31.1 32-31.1s32 14.37 32 31.1S385.6 335.1 368 335.1z"/></svg>
                        CookiePOS
                        <small className="text-xs opacity-30 mt-2 ml-1"> v1.1</small>
                    </button>
                </div>
                <div className="navbar-end">
                    <label htmlFor="my-drawer-2" className="btn btn-neutral text-primary drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </label>
                </div>
            </div>
        </>
    )
}