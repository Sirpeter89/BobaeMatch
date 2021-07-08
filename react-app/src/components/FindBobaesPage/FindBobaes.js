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
            Hi
        </div>
    )

}
