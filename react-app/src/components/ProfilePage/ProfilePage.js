import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './ProfilePage.css'


export default function ProfilePage(){

    const user = useSelector(state => state.session.user)
    const height = `${user.height}`
    const feet = height[0]
    const inches = height[1]

    return(
        <>
            <div className = "userName">
                User Name: <b>{user.username}</b>
            </div>
            <div className = "name">
                Name: <b>{user.firstname} {user.lastname}</b>
            </div>
            <div className = "cityZip">
                Location: {user.city}, {user.zipcode}
            </div>
            <div className = "age">
                Age: {user.age}
            </div>
            <div className = "height">
                Height: {feet}'{inches}"
            </div>
        </>
    )
}
