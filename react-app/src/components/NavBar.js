import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sideButtons;
  if (user){
    sideButtons =
    <nav className="nav">
      <div className="NavBarContainer">
        <div className="navButtonProfile">
          <div className="bobaIconProfile">
          </div>
          <NavLink className="profileButton" to="/" exact={true} activeClassName="active">
            Profile
          </NavLink>
        </div>
        <div className="navBobaes">
          <NavLink className="bobaes-button" to="/findBobaes" exact={true} activeClassName="active">
            &#128064; Find Bobaes
          </NavLink>
        </div>
        <div className="navMatches">
          <NavLink className="matches-button" to="/matches" exact={true} activeClassName="active">
            &#10084; Current Matches
          </NavLink>
        </div>
        <div className="navLogout">
          <LogoutButton className="navLogout"/>
        </div>
    </div>
  </nav>
  } else {
    sideButtons =
    <nav className="nav">
      <div className="NavBarContainerHome">
        <div className="navButton">
          <div className="bobaIcon">
          </div>
          <NavLink className="homeButton" to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className="navLogin">
          <NavLink to="/login" exact={true} activeClassName="active">
            &#128073;Login
          </NavLink>
        </div>
        <div className="navSignup">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            &#128073;Sign Up
          </NavLink>
        </div>
    </div>
  </nav>
  }
  return (
    <>
      {sideButtons}
    </>
  );
}

export default NavBar;
