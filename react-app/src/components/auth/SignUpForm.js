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

  const onSignUp = async (e) => {
    e.preventDefault();
    const stringHeight = `${heightFeet}`+`${heightInches}`
    const height = parseInt(stringHeight)
    if (password === repeatPassword) {
      const cityLower = city.toLowerCase();
      setCity(cityLower)
      const data = await dispatch(signUp(username, firstname, lastname,email, profileImage, city, zip, age, height, password));
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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
            {errors.map((error) => (
                <div>{error}</div>
            ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
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
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
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
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
