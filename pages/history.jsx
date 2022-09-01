import React from "react"
import Navbar from "../components/Navbar"
import Drawer from "../components/Drawer"
import Head from "next/head"

export default function History() {
    return (
        <>
            <Head>
                <title>History</title>
            </Head>
            <Navbar/>
            <Drawer>
                History
            </Drawer>
        </>
    )
}