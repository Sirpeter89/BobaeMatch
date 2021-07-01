import React, { useEffect, useState } from "react";
import './Home.css'


export default function HomePage(){
    const [transition, setTransition] = useState("disabled")
    const [blue, setBlue] = useState("https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80")
    const [brown, setBrown] = useState("https://images.unsplash.com/photo-1613018274498-7fbbaa26d5d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80")
    const [index, setIndex] = useState(0)

    useEffect(async ()=>{
        const change = await setTimeout(()=>{
            if (transition === "disabled"){
                setTransition("enabled")
            } else {
                setTransition("disabled")
            }
        }, 3000)
        if (index === 0){
            setBlue(brown)
            setBrown(blue)
            setIndex(1)
        } else {
            setBlue(blue)
            setBrown(brown)
            setIndex(0)
        }
        return () => {
            clearTimeout(change);
        }
    }, [transition])

    return (
        <>
        <div className='backgroundImageCont'>
                <img className='backgroundImage' src='https://images.unsplash.com/photo-1606626367155-5d23349572ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80' />
        </div>
        <div className='centerCarousel'>
            <div className='carouselContainer'>
                <img className={`image ${transition}`} src={blue}></img>
                <img className={`nextImage ${transition}`} src={brown}></img>
            </div>
        </div>
        </>
    )
}
