import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import './ProfilePage.css'
import {loadPreferences} from "../../store/preferences"
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'


export default function ProfilePage(){
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const preferences = useSelector(state => state.preferences.preferences)
    const height = `${user.height}`
    const feet = height[0]
    const inches = height[1]

    useEffect( async () => {
            await dispatch(loadPreferences(user.id))
    }, [])

    useEffect( () => {
    }, [preferences])

    const editInfo = () => {
        history.push('/editProfile')
    }

    const editPref = () => {
        history.push('/editPreferences')
    }

    let ifLactose;
    let ifFruit

    if(preferences && preferences.lactose ){
        ifLactose =
        <div className = "height">
            <b>Lactose Intolerant?:</b> Yes
        </div>
    } else {
        ifLactose =
        <div className = "height">
            <b>Lactose Intolerant?:</b> No
        </div>
    }

    if(preferences && preferences.fruit){
        ifFruit =
        <div className = "height">
            <b>Fruit Teas?:</b> Yes
        </div>
    } else {
        ifFruit =
        <div className = "height">
            <b>Fruit Teas?:</b> No
        </div>
    }

    return(
        <>
            <div className="profileDetailsCont">
                <div className="leftContainer">
                    <div className="detailsTitle">
                        Information:
                    </div>
                    <div className="profileDetails">
                        <div className = "userName">
                            <b>Username:</b> {user.username}
                        </div>
                        <div className = "name">
                            <b>Name:</b> {user.firstname} {user.lastname}
                        </div>
                        <div className = "cityZip">
                            <b>Location:</b> {user.city}, {user.zipcode}
                        </div>
                        <div className = "age">
                            <b>Age:</b> {user.age}
                        </div>
                        <div className = "height">
                            <b>Height:</b> {feet}'{inches}"
                        </div>
                        <div className = "height">
                            <b>Gender:</b> {user.gender}
                        </div>
                    </div>
                    <div className="editInfoBox">
                        <button className="editInfo" onClick={editInfo}>Edit Information</button>
                    </div>
                </div>
                <div className="rightContainer">
                    <div className="preferenceTitle">
                        Preference:
                    </div>
                    <div className="profileDetailsRight">
                        <div className = "userName">
                            <b>Tea:</b> {preferences && preferences.tea}
                        </div>
                        <div className = "name">
                            <b>Addons:</b> {preferences && preferences.addons}
                        </div>
                        <div className = "cityZip">
                            <b>Sugar Level:</b> {preferences && preferences.sugar}%
                        </div>
                        <div className = "age">
                            <b>Gender Preference:</b> {preferences && preferences.gender}
                        </div>
                        {ifLactose}
                        {ifFruit}
                        <div className = "age">
                            <b>Personal Description:</b> {preferences && preferences.description}
                        </div>
                    </div>
                    <div className = "editPrefBox">
                        <button className="editPref" onClick={editPref}>Edit Preferences</button>
                    </div>
                </div>
            </div>
            <div className="profileImage">
                <img className="pImg" src={user.profileImage} />
            </div>
        </>
    )
}
