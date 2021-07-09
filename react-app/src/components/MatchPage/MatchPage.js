import React, { useState, useRef } from "react"
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import './MatchPage.css'
import { loadMatches } from "../../store/match"


export default function MatchPage(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const matches = useSelector(state => state.match.match)

    const [mounted, setMounted] = useState(false)

    const [profiles, setProfiles] = useState([])

    const showProfile = useRef()

    const [matchProfiles, setMatchProfiles] = useState(0)

    useEffect(async()=>{

        if (mounted){

            let users = [];
            for(const el of matches) {
                let getUserId;
                if(el.useroneId !== user.id){
                    getUserId = el.useroneId;
                } else {
                    getUserId = el.usertwoId;
                }
                let response = await fetch(`/api/users/${getUserId}`)
                const data = await response.json();
                if (data.errors) {
                    return;
                }
                users.push(data)
            }

            showProfile.current =
                <div>
                    {users.map( (subject) => (
                        <ul className="profList">
                            <li>
                                <div className="profImageCont">
                                    <img className="profImage"src={subject.profileImage}></img>
                                </div>
                            </li>
                            <li>
                                User: {subject.username}
                            </li>
                            <li>
                                Name: {subject.firstname} {subject.lastname}
                            </li>
                            <li>
                                City: {subject.city}
                            </li>
                            <li>
                                Age: {subject.age}
                            </li>
                        </ul>
                    ))}
                </div>
            setProfiles(matchProfiles)
        }else{
            await dispatch(loadMatches(user.id))
            setMounted(true)
        }
        return ()=>{
            setMounted(false)
        }
    }, [dispatch, mounted])

    console.log("ESKETIT", profiles)
    console.log("SHOWPROFILEE", showProfile.current)
    return (
        <div>
            {showProfile.current}
        </div>
    )
}
