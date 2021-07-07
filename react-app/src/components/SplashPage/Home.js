import React, { useEffect, useState } from "react";
import './Home.css'
import logo from './BobaeMatch.png'


export default function HomePage(){
    const [transition, setTransition] = useState("disabled")

    const imageList = [
        "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", //heart hands
        "https://images.unsplash.com/photo-1613018274498-7fbbaa26d5d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", //brown boba image 1
        "https://images.unsplash.com/photo-1600505799290-e32386140a02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80", //lovers image 2
        "https://images.unsplash.com/photo-1529474944862-bf4949bd2f1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80", //blue boba image 0
        "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1506&q=80" //boba pair
    ]

    const [one, setOne] = useState(imageList[0])
    const [two, setTwo] = useState(imageList[1])

    const [index, setIndex] = useState(1)

    useEffect(async ()=>{
        const change = setTimeout(()=>{
            if (transition === "disabled"){
                setTransition("enabled")
            }
        }, 2000)
        const swapImages = setTimeout(()=>{
            if (transition === "enabled"){
                if(index === imageList.length-1){ //if we're at the last image
                    setOne(imageList[index])
                    setTwo(imageList[0])
                    setIndex(0)
                } else {
                    setOne(imageList[index])
                    setTwo(imageList[index+1])
                    setIndex(index+1)
                }
                setTransition("disabled")
            }
        },4000)
        return () => {
            clearTimeout(change);
            clearTimeout(swapImages);
        }
    }, [transition])

    return (
        <>
        <div className='backgroundImageCont'>
                <img className='backgroundImage' src='https://images.pexels.com/photos/5379707/pexels-photo-5379707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
        </div>
        <div className="logoCont">
            <img className="logo" src={logo} />
        </div>
        <div className='centerCarousel'>
            <div className='carouselContainer'>
                <div className='Text1'>
                    BobaTea &hearts;
                </div>
                <img className={`image ${transition}`} src={one}></img>
                <img className={`nextImage ${transition}`} src={two}></img>
            </div>
        </div>
        <div className="bottomText">
            Dating for Boba Lovers
        </div>
        </>
    )
}
