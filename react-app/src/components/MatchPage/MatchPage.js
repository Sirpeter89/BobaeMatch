import React, { useState, useRef } from "react"
import { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import './MatchPage.css'
import { loadMatches, deleteMatch } from "../../store/match"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import ReactModal from 'react-modal';
import ChatComponent from "./ChatComponent/ChatComponent"
import LoadingOverlay from 'react-loading-overlay';

export default function MatchPage(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    //({...state.session.user})
    const [justDeleted, setJustDeleted] = useState(false)

    const [matchProfileListArray, setMatchProfileListArray] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const deletedMatch = async (useroneid, usertwoid) => {
        await dispatch(deleteMatch(useroneid, usertwoid))
        const response = await fetch('/api/bobaes/reset', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.id,
                matchedUserId: usertwoid
            })
        });
        const data = await response.json();
        if (data.errors) {
            return;
        }
        setJustDeleted(true)
    }

    useEffect(async()=>{
        setIsActive(true)
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
                    matchProfile.push(el.id)

                    matchProfileList.push(matchProfile)
                }
            setMatchProfileListArray(matchProfileList)
            setIsActive(false)
        }
        if(justDeleted){
            setJustDeleted(false)
        }
    }, [justDeleted])

    let showProfile;
    let matchBox;



    if(matchProfileListArray.length){
        showProfile =
                    <>
                    {matchProfileListArray.map((person, ind)=>(
                        <div key={ind} className="matchRectangle">
                                <div className="userDetails">
                                    <div className="matchImageCont">
                                        <img className="profImage" src={person[0].profileImage}></img>
                                    </div>
                                    <div className="matchUserInfo">
                                        <div>
                                            <b>User:</b> {person[0].username}
                                        </div>
                                        <div>
                                            <b>Name:</b> {person[0].firstname} {person[0].lastname}
                                        </div>
                                        <div>
                                            <b>City:</b> {person[0].city}
                                        </div>
                                        <div>
                                            <b>Age:</b> {person[0].age}
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
            matchBox =
                <>
                    <ChatComponent matchData={matchProfileListArray} />
                </>
        }

    const [open, setOpen] = useState(false)

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <button onClick={handleOpenModal} className="tooltipMatch">
                <FontAwesomeIcon className="helpicon" size='5x'icon={faQuestionCircle} />
            </button>
            <ReactModal
                className="toolModalMatch"
                overlayClassName="toolOverlay"
                isOpen={open}
            >
                <button className="closeModal" onClick={handleCloseModal}>X</button>
                <div className="toolTitle">
                    Welcome To Your Bobaes Guide!
                </div>
                <div className="toolInfoMatch">
                    <p className="toolDescription">Here you can also view other users who matched with you!</p>
                    <div className="tipbox">
                        <div className="deleteMatchExample">
                            Delete Match
                        </div>
                        <p className="tips">
                            Pressing on the "Delete Match" button will remove users from your matches, this also allows you to find them again on the Find Bobaes page in case you change your mind :)
                        </p>
                    </div>
                    <p className="note">
                        <b>Note:</b> In order to become a "Current Match" both users must match on both ends!
                    </p>
                </div>

            </ReactModal>
            <div className="matchHolder">
                <LoadingOverlay
                    className="loader"
                    active={isActive}
                    spinner
                    text='Updating Your Bobae Matches!...'
                >
                <div className="yourBobaesTitle">
                    Your Bobaes
                </div>
                <div className="profilesBox">
                    {showProfile}
                    <div className="space">
                    </div>
                </div>
                </LoadingOverlay>
            </div>
            {matchBox}
        </>
    )
}
