import './FindBobaes.css'
import React, { useState } from "react"
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {loadPreferences} from "../../store/preferences"
import { loadBobaes, acceptBobae, denyBobae } from '../../store/bobaes'
import { makeMatch } from '../../store/match'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import ReactModal from 'react-modal';

export default function FindBobaes(){

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const preference = useSelector(state => state.preferences.preferences)
    const bobaes = useSelector(state => state.bobaes.bobaes)
    const [changed,setChanged]=useState(false)

    const [isMounted, setMounted] = useState(false)

    useEffect(async()=>{
        const preferences = await dispatch(loadPreferences(user.id))
        if(preferences && !isMounted){
            await dispatch(loadBobaes(user.id, preferences.gender, user.gender, preferences.tea, preferences.addons, preferences.sugar, preferences.fruit))
            setMounted(true)
        }
    }, [])

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
                            <button className="acceptBut" onClick={()=>{confirmMatch(person.id)}}>
                                <img className="acceptImage"src="https://media.istockphoto.com/vectors/kawaii-heart-cute-face-vector-illustration-vector-id1253051709?k=6&m=1253051709&s=170667a&w=0&h=Ek8hghQug_PRCMC8NpnR7V9r53QQmrxEkaP91Rb8CyI="></img>
                            </button>
                                <div className="profImageCont">
                                    <img className="profImage"src={person.profileImage}></img>
                                </div>
                            <button className="denyBut" onClick={()=>{declineMatch(person.id)}}>
                                <img className="acceptImage"src="https://media.istockphoto.com/vectors/red-heartbreak-or-broken-heart-on-blue-background-vector-id1151443140?k=6&m=1151443140&s=612x612&w=0&h=4BchXEBIZpEqzfHRzgGXLYHgW1BjeuAa4sZcn2ev5Z0="></img>
                            </button>
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
                                <div className="profileCity">
                                    <b>City:</b> {person.city}
                                </div>
                                <div className="milkTeaDetails">
                                    <p className="iLove">I &#10084; my <b>{bobaes.userPrefs[person.id].tea} Milk Teas</b>:</p>
                                    <ul className="mtList">
                                        <li className="listDetails">
                                            {bobaes.userPrefs[person.id].sugar}% Sweet
                                        </li>
                                        <li className="listDetails">
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

    const [open, setOpen] = useState(false)

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }
    return(
        <>
            <button onClick={handleOpenModal} className="tooltip">
                <FontAwesomeIcon className="helpicon" size='5x'icon={faQuestionCircle} />
            </button>
            <ReactModal
                className="toolModal"
                overlayClassName="toolOverlay"
                isOpen={open}
            >
                <button className="closeModal" onClick={handleCloseModal}>X</button>
                <div className="toolTitle">
                    Welcome To The Matching Page Guide!
                </div>
                <div className="toolInfo">
                    <p className="toolDescription">Here you will see other users who have similar tastes in Boba</p>
                    <div className="tipbox">
                        <div className="toolAccept">
                            <img className="acceptImage"src="https://media.istockphoto.com/vectors/kawaii-heart-cute-face-vector-illustration-vector-id1253051709?k=6&m=1253051709&s=170667a&w=0&h=Ek8hghQug_PRCMC8NpnR7V9r53QQmrxEkaP91Rb8CyI="></img>
                        </div>
                        <p className="tips">
                            Pressing on the heart button will allow you to match with other users
                        </p>
                    </div>
                    <div className="tipbox">
                        <div className="toolAccept">
                            <img className="acceptImage"src="https://media.istockphoto.com/vectors/red-heartbreak-or-broken-heart-on-blue-background-vector-id1151443140?k=6&m=1151443140&s=612x612&w=0&h=4BchXEBIZpEqzfHRzgGXLYHgW1BjeuAa4sZcn2ev5Z0="></img>
                        </div>
                        <p className="tips">
                            Pressing on the broken heart button will deny the match with other users
                        </p>
                    </div>
                    <p className="note">
                        <b>Note:</b> In order to become a "Current Match" both users must have matched with each other! You can view your current matches on the "Current Matches" page.
                    </p>
                </div>

            </ReactModal>
            <div className="bobaeHolder">
                <div className="bobaeTitle">
                        Bobae
                </div>
                {data}
            </div>
        </>
    )

}
