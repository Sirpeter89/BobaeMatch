import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { editProfile} from '../../store/session';
import './EditProfilePage.css'

const EditProfilePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [city, setCity] = useState(user.city);
    const [zip, setZip] = useState(user.zipcode);
    const [age, setAge] = useState(user.age);
    console.log(user)

    const prevHeight = `${user.height}`
    const prevFeet = parseInt(prevHeight[0])
    const prevInches = parseInt(prevHeight[1])

    const [heightFeet, setHeightFeet] = useState(prevFeet);
    const [heightInches, setHeightInches] = useState(prevInches);
    const [errors, setErrors] = useState([]);

    const [done, setDone] = useState(false)

    const onEdit = async (e) => {
        e.preventDefault();
        const stringHeight = `${heightFeet}`+`${heightInches}`
        const height = parseInt(stringHeight)
        const cityLower = city.toLowerCase();
        setCity(cityLower)
        await dispatch(editProfile(firstname, lastname, profileImage, city, zip, age, height));

        // if (datas.errors) {
        //     setErrors(datas.errors);
        // }
        history.push('/')
        };

    useEffect(()=>{
    },[user])

    const updateFirstname = (e) => {
    setFirstname(e.target.value);
    };

    const updateLastname = (e) => {
    setLastname(e.target.value);
    };

    const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
    };

    const updateCity = (e) => {
    setCity(e.target.value);
    };

    const updateZip = (e) => {
    setZip(e.target.value);
    };

    const updateAge = (e) => {
    setAge(e.target.value);
    };

    const updateHeightFeet = (e) => {
    setHeightFeet(e.target.value);
    };

    const updateHeightInches = (e) => {
    setHeightInches(e.target.value);
    };

    return (
        <form onSubmit={onEdit}>
            <div>
                {errors.map((error) => (
                    <div>{error}</div>
                ))}
            </div>

            <div>
            <label>First Name</label>
            <input
                type="text"
                name="firstname"
                onChange={updateFirstname}
                value={firstname}
            ></input>
            </div>

            <div>
            <label>Last Name</label>
            <input
                type="text"
                name="lastname"
                onChange={updateLastname}
                value={lastname}
            ></input>
            </div>

            <div>
            <label>Profile Image</label>
            <input
                type="text"
                name="profileImage"
                onChange={updateProfileImage}
                value={profileImage}
            ></input>
            </div>

            <div>
            <label>City</label>
            <input
                type="text"
                name="city"
                onChange={updateCity}
                value={city}
            ></input>
            </div>

            <div>
            <label>Zip Code</label>
            <input
                type="number"
                name="zipcode"
                onChange={updateZip}
                value={zip}
            ></input>
            </div>

            <div>
            <label>Age</label>
            <input
                type="number"
                name="age"
                onChange={updateAge}
                value={age}
            ></input>
            </div>

            <div className="HeightBox">
            <div>
                <label>Height Feet: </label>
                <input
                type="number"
                name="heightFeet"
                onChange={updateHeightFeet}
                value={heightFeet}
                ></input>
            </div>
            <div>
                <label>Inches: </label>
                <input
                type="number"
                name="heightInches"
                onChange={updateHeightInches}
                value={heightInches}
                ></input>
            </div>
            </div>

            <button type="submit">Submit Changes</button>
        </form>
        );
    };

export default EditProfilePage;
