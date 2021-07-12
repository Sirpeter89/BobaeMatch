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
    const [gender, setGender] = useState("Male");

    const prevHeight = `${user.height}`
    const prevFeet = parseInt(prevHeight[0])
    const prevInches = parseInt(prevHeight[1])

    const [heightFeet, setHeightFeet] = useState(prevFeet);
    const [heightInches, setHeightInches] = useState(prevInches);
    const [errors, setErrors] = useState([]);


    const onEdit = async (e) => {
        e.preventDefault();
        const stringHeight = `${heightFeet}`+`${heightInches}`
        const height = parseInt(stringHeight)
        const cityLower = city.toLowerCase();
        setCity(cityLower)
        await dispatch(editProfile(firstname, lastname, profileImage, city, zip, age, height, gender));

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

    const updateGender= (e) => {
        setGender(e.target.value);
    };

    return (
        <>
            <div className='backgroundImageContProfile'>
                <img className='backgroundImageProfile' src='https://images.pexels.com/photos/5379707/pexels-photo-5379707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
            </div>
            <div className="loginHolder">
                <div className="loginTitle">
                    Edit Profile
                </div>
                <form className="editProfileForm" onSubmit={onEdit}>
                    <div>
                        {errors.map((error) => (
                            <div>{error}</div>
                        ))}
                    </div>

                    <div>
                        <div className="inputLabel">
                            <label>First Name:</label>
                        </div>
                        <input className="inputArea"
                            type="text"
                            name="firstname"
                            onChange={updateFirstname}
                            value={firstname}
                        ></input>
                    </div>

                    <div>
                    <div className="inputLabel">
                            <label>Last Name:</label>
                        </div>
                    <input className="inputArea"
                        type="text"
                        name="lastname"
                        onChange={updateLastname}
                        value={lastname}
                    ></input>
                    </div>

                    <div>
                        <div className="inputLabel">
                                <label>Profile Image Url:</label>
                        </div>
                    <input className="inputArea"
                        type="text"
                        name="profileImage"
                        onChange={updateProfileImage}
                        value={profileImage}
                    ></input>
                    </div>

                    <div>
                        <div className="inputLabel">
                                <label>City:</label>
                        </div>
                    <input className="inputArea"
                        type="text"
                        name="city"
                        onChange={updateCity}
                        value={city}
                    ></input>
                    </div>

                    <div>
                        <div className="inputLabel">
                                <label>Zipcode:</label>
                        </div>
                    <input className="inputArea"
                        type="number"
                        name="zipcode"
                        onChange={updateZip}
                        value={zip}
                    ></input>
                    </div>

                    <div>
                        <div className="inputLabel">
                            <label>Age</label>
                        </div>
                    <input className="inputArea"
                        type="number"
                        name="age"
                        onChange={updateAge}
                        value={age}
                    ></input>
                    </div>

                    <div className="genderLabel">
                        <label>Gender:</label>
                    </div>
                    <div className="inputArea">
                        <input className="radio" type="radio" id="male" name="gender" value="Male" onClick={updateGender}></input>
                        <label className="radioLabels" for="html">Male</label>
                        <input className="radio" type="radio" id="female" name="gender" value="Female" onClick={updateGender}></input>
                        <label className="radioLabels" for="html">Female</label>
                    </div>

                    <div className="heightLabel">
                <label>Height:</label>
            </div>
            <div className="HeightBox">
                <div className="feetDiv">
                <label className="heightDetails">Feet: </label>
                <input className="heightInput"
                    type="number"
                    name="heightFeet"
                    onChange={updateHeightFeet}
                    value={heightFeet}
                ></input>
                </div>
                <div>
                <label className="heightDetails">Inches: </label>
                <input className="heightInput"
                    type="number"
                    name="heightInches"
                    onChange={updateHeightInches}
                    value={heightInches}
                ></input>
                </div>
            </div>

                    <button className="submitChangesButton" type="submit">Submit Changes</button>
                </form>
            </div>
        </>
        );
    };

export default EditProfilePage;
