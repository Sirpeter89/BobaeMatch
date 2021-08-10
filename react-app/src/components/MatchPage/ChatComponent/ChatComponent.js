import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import './ChatComponent.css'
import { io } from 'socket.io-client';
import { useHistory } from "react-router-dom";

let socket;

export default function ChatComponent(props){
    let history = useHistory();
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");

    const [userToTalkWith, setuserToTalkWith] = useState("");
    const [userToTalkWithName, setuserToTalkWithName] = useState("")

    const user = useSelector(state => state.session.user)

    useEffect( ()=>{
        socket = io();
        socket.emit("join", userToTalkWith);

        socket.on("connect", async ()=>{
                if(userToTalkWith){
                    let oldMessages = await fetch(`/api/messages/${userToTalkWith}`)
                    const data = await oldMessages.json();
                    if(Array.isArray(data.message)){
                        setMessages(data.message)
                    }
                }
            }
        )

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })


        return (() => {
            socket.disconnect()
            setMessages([])
        })
    }, [userToTalkWith])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const joinChat = (matchId, username) => {
        setuserToTalkWith(matchId)
        setuserToTalkWithName(username)

    }

    const sendChat = async (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user.username, msg: chatInput }, userToTalkWith);
        //add new messages to db
        let response = await fetch('/api/messages/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: [...messages, { user: user.username, msg: chatInput }],
                matchId: parseInt(userToTalkWith)
            })
        });
        let data = await response.json();
        if (!Object.keys(data).length){
            socket.emit("chat", { user: "NOTICE", msg: "You've been unmatched, the other user will not see these messages, please wait while we update the page"}, userToTalkWith);
            setTimeout(()=>{
                history.go(0)
            },5000)
        }
        // clear the input field after the message is sent
        setChatInput("")
    }

    let pickUser;
        if (!userToTalkWithName){
            pickUser =
            <div className="pick-input">
                Select a Bobae to chat with!
            </div>
        } else {
            pickUser =
            <div className="chat-area">
                <div className="chat-title">
                    Chatting With: <b>{userToTalkWithName}</b>
                </div>
                <div className="chat-view">
                    {messages.map((message, ind)=> (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
                <form onSubmit={sendChat} className="chat-input">
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                        className="input-element"
                    />
                    <button className="chat-submit" type="submit">Send</button>
                </form>
            </div>
        }


    return(
        <div className="chat-container">
            <div className="names-chat-container">
                {props.matchData.map((person, ind)=>(
                    <div key={ind} onClick={()=>joinChat(`${person[2]}`, `${person[0].username}`)} className="user-chat-container">
                        {person[0].username}
                    </div>
                ))}
            </div>
            {pickUser}
        </div>
    )
}
