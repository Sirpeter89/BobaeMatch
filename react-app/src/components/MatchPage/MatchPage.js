import React, { useState, useRef } from "react"
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import './MatchPage.css'
import { loadMatches, deleteMatch } from "../../store/match"


export default function MatchPage(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    //({...state.session.user})

    const [justDeleted, setJustDeleted] = useState(false)

    const [matchProfileListArray, setMatchProfileListArray] = useState([]);

    const deletedMatch = async (useroneid, usertwoid) => {
        console.log(useroneid, usertwoid)
        await dispatch(deleteMatch(useroneid, usertwoid))
        setJustDeleted(true)
    }

    useEffect(async()=>{

        const match = await dispatch(loadMatches(user.id))

        if (match){

            let matchProfileList = [];
            let users;
            let preferences;
                for(const el of match.match) {
                    let matchProfile = [];
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
                    users = data
                    let prefResponse = await fetch(`/api/preferences/${getUserId}`)
                    const prefData = await prefResponse.json();
                    if (prefData.errors) {
                        return;
                    }
                    preferences= prefData

                    matchProfile.push(users)
                    matchProfile.push(preferences)

                    matchProfileList.push(matchProfile)
                }
            setMatchProfileListArray(matchProfileList)
        }
        if(justDeleted){
            setJustDeleted(false)
        }
    }, [justDeleted])

    let showProfile;

    if(matchProfileListArray.length){
        showProfile =
                    <>
                    {matchProfileListArray.map((person)=>(
                        <div className="matchRectangle">

                                <div className="userDetails">
                                    <div className="matchImageCont">
                                        <img className="profImage" src={person[0].profileImage}></img>
                                    </div>
                                    <div className="matchUserInfo">
                                        <div>
                                            User: {person[0].username}
                                        </div>
                                        <div>
                                            Name: {person[0].firstname} {person[0].lastname}
                                        </div>
                                        <div>
                                            City: {person[0].city}
                                        </div>
                                        <div>
                                            Age: {person[0].age}
                                        </div>
                                    </div>
                                </div>

                                <div className="userPreferences">
                                    <div className="bobaPrefTitle">
                                        <u><b>Boba Preference:</b></u>
                                        <div className="matchPrefDetails">
                                            <div>
                                                <b>Tea:</b> {person[1].tea}
                                            </div>
                                            <div>
                                                <b>Addons:</b> {person[1].addons}
                                            </div>
                                            <div>
                                                <b>Sweetness:</b> {person[1].sugar}
                                            </div>
                                            <div>
                                                <b>Description:</b> {person[1].description}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="matchPrefExtraDetails">
                                        <div>
                                            {person[1].lactose? <p>Milk is somewhat my enemy &#128557;</p>
                                                            : <p>Milk is not my enemy &#128516;</p>}
                                        </div>
                                        <div>
                                            {person[1].fruit? <p>Fruit Teas are my thing &#128540;</p>
                                                            : <p>Fruit Teas are not my thing &#128547;</p>}
                                        </div>
                                </div>
                                <div className="DeleteArea">
                                    <button className="DeleteButton" onClick={()=>deletedMatch(user.id, person[0].id)}>Delete Match</button>
                                </div>

                        </div>
                    ))}

                    </>
        }

    return (
        <>
            <div className="matchHolder">
                <div className="yourBobaesTitle">
                    Your Bobaes
                </div>
                {showProfile}
            </div>
        </>
    )
}
