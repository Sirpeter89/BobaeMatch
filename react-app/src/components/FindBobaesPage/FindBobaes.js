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
            {Object.entries(bobaes.userProfiles).map( ([key, person], i) => (

                // Check if the user hasn't already accepted or declined potential match
                !bobaes.PotentialMatches[person.id].accepted && !bobaes.PotentialMatches[person.id].declined?

                <div className="matchProfiles" key={i}>
                    <div className="userNameTitle">
                        <b>{person.username}</b>
                    </div>
                    <div className="profileHolder">
                        <div className="buttonsAndPic">
                            <button className="acceptBut" onClick={()=>{confirmMatch(person.id)}}></button>
                                <div className="profImageCont">
                                    <img className="profImage"src={person.profileImage}></img>
                                </div>
                            <button className="denyBut" onClick={()=>{declineMatch(person.id)}}></button>
                        </div>
                        <div className="nameTitle">
                            {person.firstname} {person.lastname}
                        </div>
                        <div className="nameTitle">
                            <b>Age:</b> {person.age},&nbsp;<b>Height:</b>{parseInt(person.height/10)}'{person.height%10}"
                        </div>
                            <div className="about">
                                About Me
                            </div>
                            <div className="profileContents">
                                <div className="profileDets">
                                    <b>City:</b> {person.city}
                                </div>
                                <div className="milkTeaDetails">
                                    <p className="iLove">I &#10084; my <b>{bobaes.userPrefs[person.id].tea} Milk Teas</b>:</p>
                                    <ul className="mtList">
                                        <li>
                                            {bobaes.userPrefs[person.id].sugar}% Sweet
                                        </li>
                                        <li>
                                            With {bobaes.userPrefs[person.id].addons}
                                        </li>
                                    </ul>
                                </div>
                            <div>
                        </div>
                        {(bobaes.userPrefs[person.id].lactose)
                                ? <div className="extraDets">Milk is somewhat my enemy &#128557;</div>
                                :<div className="extraDets">Milk is not my enemy &#128516;</div>}
                        {(bobaes.userPrefs[person.id].fruit)
                                ? <div className="extraDets2">Fruit Teas are my thing &#128540;</div>
                                :<div className="extraDets2">Fruit Teas are not my thing &#128547;</div>}
                        <div className="finalDesc">Why? Because {bobaes.userPrefs[person.id].description}</div>
                    </div>
                    </div>
                </div> : null
            ))}
        </div>

    }

    return(
        <>
            <div className='backgroundImageContProfile'>
                <img className='backgroundImageProfile' src='https://images.pexels.com/photos/5379707/pexels-photo-5379707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
            </div>
            <div className="loginHolder">
                <div className="bobaeTitle">
                        Bobae
                </div>
                {data}
            </div>
        </>
    )

}
