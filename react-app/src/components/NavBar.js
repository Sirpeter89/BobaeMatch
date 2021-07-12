import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';
import { demoUser1, demoUser2 } from '../store/session';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  const onDemo1Click = async (e) => {
    e.preventDefault()
    await dispatch(demoUser1())
  }

  const onDemo2Click = async (e) => {
    e.preventDefault()
    await dispatch(demoUser2())
  }


  let sideButtons;
  if (user){
    sideButtons =
    <nav>
      <ul className="NavBarContainer">
        <li className="navButtonProfile">
          <div className="bobaIconProfile">
          </div>
          <NavLink className="linkWordsProfile" to="/" exact={true} activeClassName="active">
            Profile
          </NavLink>
        </li>
        <li className="bobaesLink">
          <NavLink className="linkFindWords" to="/findBobaes" exact={true} activeClassName="active">
            &#128064; Find Bobaes
          </NavLink>
        </li>
        <li className="matchesLink">
          <NavLink className="linkFindWords" to="/matches" exact={true} activeClassName="active">
            &#10084; Current Matches
          </NavLink>
        </li>
        <li className="logout">
          <LogoutButton />
        </li>
    </ul>
  </nav>
  } else {
    sideButtons =
    <nav>
      <ul className="NavBarContainerHome">
        <li className="navButton">
          <div className="bobaIcon">
          </div>
          <NavLink className="linkWords" to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <button className="demoButton" onClick={onDemo1Click}>Demo User1 Login</button>
        <button className="demoButton" onClick={onDemo2Click}>Demo User2 Login</button>
        <li className="aboutInfo">
          Developed by Justin Wong: <a href="https://github.com/Sirpeter89">Github</a>
        </li>
        <li>
          <NavLink  className="linkLoginWords" to="/login" exact={true} activeClassName="active">
            &#128073;Login
          </NavLink>
        </li>
        <li>
          <NavLink className="linkSignUpWords" to="/sign-up" exact={true} activeClassName="active">
            &#128073;Sign Up
          </NavLink>
        </li>
    </ul>
  </nav>
  }
  return (
    <>
      {sideButtons}
    </>
  );
}

export default NavBar;
