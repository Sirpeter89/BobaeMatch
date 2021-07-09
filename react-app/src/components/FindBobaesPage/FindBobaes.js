import './FindBobaes.css'
import React, { useState } from "react"
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {loadPreferences} from "../../store/preferences"
import { loadBobaes, acceptBobae, denyBobae } from '../../store/bobaes'
import { makeMatch } from '../../store/match'

export default function FindBobaes(){

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const preference = useSelector(state => state.preferences.preferences)
    const bobaes = useSelector(state => state.bobaes.bobaes)
    const [changed,setChanged]=useState(false)

    useEffect(async()=>{
        await dispatch(loadPreferences(user.id))
    }, [])

    useEffect(async()=>{
        if(preference){
            await dispatch(loadBobaes(user.id, preference.gender, user.gender, preference.tea, preference.addons, preference.sugar, preference.fruit))
        }
    }, [preference])

    const confirmMatch = async (matchedUserId) => {

        await dispatch(acceptBobae(user.id, matchedUserId))

        // check to see if someone already matched
        const checkMatch = await fetch('/api/bobaes/checkMatch',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId:user.id,
                matchedUserId
            })
        });
        const confirmMatch = await checkMatch.json();
        if (checkMatch.errors) {
            return;
        }

        if (confirmMatch.accepted === true){
            await dispatch(makeMatch(user.id, matchedUserId))
        }
        setChanged(!changed)
    }

    const declineMatch = async (matchedUserId) => {
        await dispatch(denyBobae(user.id, matchedUserId))
        setChanged(!changed)
    }

    let data;
    if(bobaes !== null){
        data =
        <div className="profilesOuterContainer">
            <div className="profilesContainer">
            {Object.entries(bobaes.userProfiles).map( ([key, subject], i) => (

                // Check if the user hasn't already accepted or declined potential match
                !bobaes.PotentialMatches[subject.id].accepted && !bobaes.PotentialMatches[subject.id].declined?

                <div className="matchProfiles" key={i}>
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
                    <button onClick={()=>{confirmMatch(subject.id)}}>Match</button>
                    <button onClick={()=>{declineMatch(subject.id)}}>Don't Match</button>
                </div> : null
            ))}
            </div>
        </div>

    }

    return(
        <div>
            {data}
        </div>
    )

}
