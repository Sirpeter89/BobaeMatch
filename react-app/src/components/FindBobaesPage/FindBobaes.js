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

    let userGender = user.gender

    useEffect(async()=>{
        await dispatch(loadPreferences(user.id))
        await dispatch(loadBobaes(user.id, preference.gender, user.gender, preference.tea))
    }, [])

    return(
        <div>
            Hi
        </div>
    )

}
