import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './LoginForm.css'
import { demoUser1, demoUser2 } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onDemo1Click = async (e) => {
    e.preventDefault()
    await dispatch(demoUser1())
  }

  const onDemo2Click = async (e) => {
    e.preventDefault()
    await dispatch(demoUser2())
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
      <div className="loginHolder">
        <div className="loginTitle">
                      Let's Login
        </div>
        <form className="loginForm" onSubmit={onLogin}>
          <div className="errorsDiv">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <div className="inputLabel">
              <label htmlFor="email">Email</label>
            </div>
            <input className="inputArea"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <div className="inputLabel">
              <label htmlFor="password">Password</label>
            </div>
            <input className="inputArea"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="login-container">
              <button className="loginButton" type="submit">Login</button>
          </div>
        </form>
        <div className="new-user">
          New User? &nbsp; <a className="signup-link" href="/sign-up">Sign Up</a>
        </div>
        <div className="demo-buttons">
          <div className="demo1">
            <button className="demoButton" onClick={onDemo1Click}>Login As Demo User 1</button>
          </div>
          <div className="demo2">
            <button className="demoButton" onClick={onDemo2Click}>Login As Demo User 2</button>
          </div>
        </div>
        <div className="empty-space"></div>
      </div>
  );
};

export default LoginForm;
