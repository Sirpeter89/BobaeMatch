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
            {Object.entries(bobaes.userProfiles).map( ([key, person], i) => (

                // Check if the user hasn't already accepted or declined potential match
                !bobaes.PotentialMatches[person.id].accepted && !bobaes.PotentialMatches[person.id].declined?

                <div className="matchProfiles" key={i}>
                    <ul className="profList">
                        <li>
                            <div className="profImageCont">
                                <img className="profImage"src={person.profileImage}></img>
                            </div>
                            <div className="hoverDetails">
                                <h1>I Love</h1>
                                <h2>My {bobaes.userPrefs[person.id].tea} Milk Tea:</h2>
                                <ul>
                                    <li>
                                        {bobaes.userPrefs[person.id].sugar}% Sweet
                                    </li>
                                    <li>
                                        With {bobaes.userPrefs[person.id].addons}
                                    </li>
                                </ul>
                                {(bobaes.userPrefs[person.id].lactose)
                                    ? <h2>&#128557; Milk is somewhat my enemy &#128557;</h2>
                                    :<h2>&#128516; Milk is not my enemy &#128516;</h2>}
                                {(bobaes.userPrefs[person.id].fruit)
                                    ? <h2>&#128540; Fruit Teas are my thing &#128540;</h2>
                                    :<h2>&#128547; Fruit Teas are not my thing &#128547;</h2>}
                                <p>Why? Because {bobaes.userPrefs[person.id].description}</p>
                            </div>
                        </li>
                        <li>
                            User: {person.username}
                        </li>
                        <li>
                            Name: {person.firstname} {person.lastname}
                        </li>
                        <li>
                            City: {person.city}
                        </li>
                        <li>
                            Age: {person.age}
                        </li>
                    </ul>
                    <button onClick={()=>{confirmMatch(person.id)}}>Match</button>
                    <button onClick={()=>{declineMatch(person.id)}}>Don't Match</button>
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
