import React from "react"
import './ImageComponent.css'

export default function ImageComponent(props){
    return(
        <div className="ImageContainer">
            <div className="prefImage">
                <img className="prefimg" src={props.image}/>
            </div>
            <div className="prefText">
                {props.text}
            </div>
        </div>
    )
}
