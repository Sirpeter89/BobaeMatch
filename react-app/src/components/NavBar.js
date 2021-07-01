import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  let sideButtons;
  if (user){
    sideButtons =
    <nav>
      <ul className="NavBarContainer">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
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
      <ul className="NavBarContainer">
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
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
