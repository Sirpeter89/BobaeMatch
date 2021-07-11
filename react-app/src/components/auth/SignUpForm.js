import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState(0);
  const [age, setAge] = useState(0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [gender, setGender] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    const stringHeight = `${heightFeet}`+`${heightInches}`
    const height = parseInt(stringHeight)
    if (password === repeatPassword) {
      const cityLower = city.toLowerCase();
      setCity(cityLower)
      const data = await dispatch(signUp(username, firstname, lastname,email, profileImage, city, zip, age, height, password, gender));
      if (data.errors) {
        setErrors(data.errors);
        }
      history.push("/preferences")
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
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

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateGender= (e) => {
    setGender(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className='backgroundImageContSignUp'>
                <img className='backgroundImageProfile' src='https://images.pexels.com/photos/5379707/pexels-photo-5379707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
      </div>
      <div className="choiceHolder">
          <div className="SignUpTitle">
                        Let's Sign Up
          </div>
          <form className="signUpForm" onSubmit={onSignUp}>
            <div>
                  {errors.map((error) => (
                      <div>{error}</div>
                  ))}
            </div>
            <div>
              <div className="inputLabel">
                <label>User Name:</label>
              </div>
              <input className="inputArea"
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
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
                <label>Email:</label>
              </div>
              <input className="inputArea"
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
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
                <label>Zip Code:</label>
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
                <label>Age:</label>
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
              <input className="radio" type="radio" id="male" name="gender" value="Male" onClick={updateGender} checked="checked"></input>
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
            <div>
              <div className="inputLabel">
                <label>Password:</label>
              </div>
              <input className="inputArea"
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <div className="inputLabel">
                <label>Repeat Password:</label>
              </div>
              <input className="inputArea"
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className="signUpButton" type="submit">Sign Up</button>
          </form>
        </div>
    </div>
  );
};

export default SignUpForm;
