import React, { ChangeEventHandler } from "react";

export default function DarkMode() {

    const setDark = () => {
        window.localStorage.setItem("theme", "dark")
        document.documentElement.setAttribute("data-theme", "dark")
    }
    const setLight = () => {
        window.localStorage.setItem("theme", "light")
        document.documentElement.setAttribute("data-theme", "light")
    }
   
        const storedTheme = typeof window !== "undefined" ? window.localStorage.getItem("theme") : false
        const preferedTheme = typeof window !== "undefined" ? window.matchMedia && window.matchMedia("(prefers-color-schema:dark)").matches : true
       
    const defaultTheme = storedTheme === "dark" || (storedTheme === null && preferedTheme)
  


    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDark()
        } else {
            setLight()
        }
    }
    return (
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <label className="toggle-theme" htmlFor="checkbox">
                <input

                    type="checkbox"
                    id="checkbox"
                    onChange={toggleTheme}
                    defaultChecked={ defaultTheme}
                />
                <div className="slider round"></div>
            </label>
            <span>🌒</span>
        </div>
    );


}