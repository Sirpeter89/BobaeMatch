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
            Lactose Intolerant?: <b>Yes</b>
        </div>
    } else {
        ifLactose =
        <div className = "height">
            Lactose Intolerant?: <b>No</b>
        </div>
    }

    if(preferences && preferences.fruit){
        ifFruit =
        <div className = "height">
            Fruit Teas?: <b>Yes</b>
        </div>
    } else {
        ifFruit =
        <div className = "height">
            Fruit Teas?: <b>No</b>
        </div>
    }

    return(
        <>
            <div className='backgroundImageContProfile'>
                <img className='backgroundImageProfile' src='https://images.unsplash.com/photo-1555050551-82f8d95a0614?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' />
            </div>
            <div className="profileDetailsCont">
                <div className="leftContainer">
                    <div className="detailsTitle">
                        Information:
                    </div>
                    <div className="profileDetails">
                        <div className = "userName">
                            User Name: <b>{user.username}</b>
                        </div>
                        <div className = "name">
                            Name: <b>{user.firstname} {user.lastname}</b>
                        </div>
                        <div className = "cityZip">
                            Location: <b>{user.city}, {user.zipcode}</b>
                        </div>
                        <div className = "age">
                            Age: <b>{user.age}</b>
                        </div>
                        <div className = "height">
                            Height: <b>{feet}'{inches}"</b>
                        </div>
                    </div>

                </div>
                <div className="rightContainer">
                    Preferences:
                    <div className="profileDetails">
                        <div className = "userName">
                            Tea: <b>{preferences && preferences.tea}</b>
                        </div>
                        <div className = "name">
                            Addons: <b>{preferences && preferences.addons}</b>
                        </div>
                        <div className = "cityZip">
                            Sugar Level: <b>{preferences && preferences.sugar}%</b>
                        </div>
                        <div className = "age">
                            Gender Preference: <b>{preferences && preferences.gender}</b>
                        </div>
                        {ifLactose}
                        {ifFruit}
                        <div className = "age">
                            Personal Description: <b>{preferences && preferences.description}</b>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profileImage">
                <img className="pImg" src={user.profileImage} />
            </div>
            <button className="editInfo" onClick={editInfo}>Edit Information</button>
            <button className="editPref" onClick={editPref}>Edit Preferences</button>
        </>
    )
}
