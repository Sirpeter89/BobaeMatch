import React, { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux";
import './ChatComponent.css'
import { io } from 'socket.io-client';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

let socket;

export default function ChatComponent(props){
    let history = useHistory();
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState("");

    const [userToTalkWith, setuserToTalkWith] = useState("");
    const [userToTalkWithName, setuserToTalkWithName] = useState("")

    const user = useSelector(state => state.session.user)

    const endOfMessages = useRef(null)
    const buttonRef = useRef(null)
    const chatRef = useRef(null)
    const closeRef = useRef(null)

    const scrollDown = () => {
        if (endOfMessages.current){
            endOfMessages.current.scrollIntoView({ behavior: "smooth", block: 'end' })
        }
    }

    const openChat = () => {
        buttonRef.current.classList.add("disabled")
        chatRef.current.classList.remove("disabled")
        closeRef.current.classList.remove("disabled")
    }

    const closeChat = () => {
        chatRef.current.classList.add("disabled")
        closeRef.current.classList.add("disabled")
        buttonRef.current.classList.remove("disabled")
    }

    useEffect( ()=>{

        if (socket){
            socket.disconnect()
        }

        if(userToTalkWith){
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
                    scrollDown();
                }
            )

            socket.on("chat", (chat) => {
                scrollDown();
                setMessages(messages => [...messages, chat])
            })
        }

        return (() => {
            if (socket){
                socket.disconnect()
            }
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
                    <b>Bobae:</b> {userToTalkWithName}
                </div>
                <div className="chat-view">
                    {messages.map((message, ind)=> (
                        <div className="chat-text" key={ind}><b>{`${message.user}`}</b>: {`${message.msg}`}</div>
                    ))}
                    <div className="chat-space" ref={endOfMessages}>
                        &nbsp;
                    </div>
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
        <>
            <button className="chat-button" ref={buttonRef} onClick={openChat}>
                <div>Chat With Bobaes</div>
                <FontAwesomeIcon className="helpicon" size='3x'icon={faCommentDots} />
            </button>
            <button className="close-button disabled" ref={closeRef} onClick={closeChat}>
                X
            </button>
            <div className="chat-container disabled" ref={chatRef}>
                <div className="names-chat-container">
                    {props.matchData.map((person, ind)=>(
                        <div key={ind} onClick={()=>joinChat(`${person[2]}`, `${person[0].username}`)} className="user-chat-container">
                            {person[0].username}
                        </div>
                    ))}
                </div>
                {pickUser}
            </div>
        </>

    )
}
