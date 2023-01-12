import React, { useState, useEffect } from "react"
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
export default function GoUp() {
    const [showGoTop, setShowGoTop] = useState(false)

   
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 400) {
            setShowGoTop(true)
        }
        else if (scrolled <= 400) {
            setShowGoTop(false)
        }
    };
    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }
    useEffect(() => {
        typeof window !== "undefined" ? window.addEventListener('scroll', toggleVisible) : false




    }, [])
   
    return (
        <div onClick={handleScrollUp} className="goTop">
           
                <AirplanemodeActiveIcon style={{ display: showGoTop ? 'block' : 'none' }} />

           
        </div>
    )
}