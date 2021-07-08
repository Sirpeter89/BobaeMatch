import './FindBobaes.css'
import React, { useState } from "react"
import { useEffect } from 'react'
import {enterPreferences} from "../../store/preferences"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"
import {loadPreferences} from "../../store/preferences"
import { loadBobaes } from '../../store/bobaes'

export default function FindBobaes(){

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const preference = useSelector(state => state.preferences.preferences)
    const bobaes = useSelector(state => state.bobaes.bobaes)

    let data;
    if(bobaes !== null){
        console.log(Object.entries(bobaes.userProfiles))
        data =
        <div>
            {Object.entries(bobaes.userProfiles).map( ([key, subject], i) => (
                <div className="matchProfiles" key={i}>
                    <ul className="input-label">
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
                </div>
            ))}
        </div>
    }

    useEffect(async()=>{
        await dispatch(loadPreferences(user.id))
    }, [])

    useEffect(async()=>{
        if(preference){
            await dispatch(loadBobaes(user.id, preference.gender, user.gender, preference.tea, preference.addons, preference.sugar, preference.fruit))
        }
    }, [preference])

    return(
        <div>
            {data}
        </div>
    )

}
