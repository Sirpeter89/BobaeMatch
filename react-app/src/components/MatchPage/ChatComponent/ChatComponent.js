import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import './ChatComponent.css'
import { io } from 'socket.io-client';

let socket;

export default function ChatComponent(props){
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");

    const [userToTalkWith, setuserToTalkWith] = useState("");

    const user = useSelector(state => state.session.user)

    useEffect(()=>{
        console.log("ISS", props.matchData)
        console.log(userToTalkWith)

        socket = io();

        socket.on("chat", (chat) => {
            // socket.join(userToTalkWith)
            setMessages(messages => [...messages, chat])
        })


        return (() => {
            socket.disconnect()
        })
    }, [userToTalkWith])



    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const joinChat = (matchId) => {
        setuserToTalkWith(matchId)
        socket.emit("join", userToTalkWith);
    }

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user.username, msg: chatInput }, userToTalkWith);
        // clear the input field after the message is sent
        setChatInput("")
    }

    return(
        <div className="chat-container">
            <div className="names-chat-container">
                {props.matchData.map((person)=>(
                    <div onClick={()=>joinChat(`${person[2]}`)} className="user-chat-container">
                        {person[0].firstname}
                    </div>
                ))}
            </div>
            <div className="chat-area">
                <div>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
                <form onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}
