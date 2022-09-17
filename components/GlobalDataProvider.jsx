import React, {useEffect, useState} from "react"
import Navbar from "./Navbar"
import Drawer from "./Drawer"

export default function GlobalDataProvider({children}) {

    const [theme, setTheme] = useState("night")
    function changeTheme(newTheme) {
        window.localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }
    function themeInit() {
        setTheme(window.localStorage.getItem("theme"))
    }

    function constructor() {
        if(window.localStorage.getItem("theme")===null){
            window.localStorage.setItem("theme", "night")
        }

        let categories = JSON.parse(window.localStorage.getItem("categories"))
        if(categories===null) {
            categories = []
            window.localStorage.setItem("categories", JSON.stringify(categories))
            categories = JSON.parse(window.localStorage.getItem("categories"))
        }

        let items = JSON.parse(window.localStorage.getItem("items"))
        if(items===null) {
            items = []
            window.localStorage.setItem("items", JSON.stringify(items))
            items = JSON.parse(window.localStorage.getItem("items"))
        }

        let history = JSON.parse(window.localStorage.getItem("history"))
        if(history===null) {
            history = []
            window.localStorage.setItem("history", JSON.stringify(history))
            history = JSON.parse(window.localStorage.getItem("history"))
        }
    }
    useEffect(()=>{
        constructor()
        themeInit()
    },[])
    return (
        <>
        <div className="h-screen overflow-hidden">
            <Navbar 
                theme={theme} 
            />
            <Drawer 
                changeTheme={changeTheme} 
                theme={theme}
                >
                {children}
            </Drawer>
        </div>
        </>
    )
}