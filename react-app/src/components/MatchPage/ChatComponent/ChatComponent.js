import React, { useEffect } from "react"
import './ChatComponent.css'

export default function ChatComponent(props){

    useEffect(()=>{
        console.log("ISS", props.matchData)
    }, [])

    return(
        <div className="chat-container">
            {props.matchData.map((person)=>(
                <div>
                    {person[0].firstname}
                </div>
            ))}
        </div>
    )
}
