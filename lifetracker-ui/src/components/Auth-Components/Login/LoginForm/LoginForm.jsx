import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import FormErrorMessage from "../../FormErrorMessage/FormErrorMessage";
import { BiLogIn } from "react-icons/bi";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({appState, setAppState}) {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // handles input validation message
  const navigate = useNavigate()

  const url = `http://localhost:3001/auth/login`;

  const handleChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
    setErrorMessage("")
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(url, loginDetails);
      setErrorMessage("")
      setLoginDetails({ email: "", password: "" });
      localStorage.setItem("lifetracker_token", result.data.token)
      setAppState(appState => {return {...appState, user: {...result.data.user}, token: result.data.token, isAuthenticated: true}})
      navigate("/activity")
    } catch (error) {
      localStorage.clear()
      console.error(error)
      setAppState({
        user: {},
        token: null,
        isAuthenticated: false,
        nutrition: [],
        sleep: [],
        exercise: [],
      })
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="auth-div">
      <header className="auth-header">
        <IconContext.Provider
          value={{ color: "var(--button-color)", size: "4.5rem" }}
        >
          <BiLogIn className="user-icon" />
        </IconContext.Provider>
        <h2>Welcome Back</h2>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="long-input-div">
            <label htmlFor="email"></label>
            <input
              className="long-input-box"
              type="email"
              placeholder="example@domain.com"
              onChange={handleChange}
              name="email"
              value={loginDetails.email}
              required
            />
          </div>
          <div className="long-input-div">
            <label htmlFor="password"></label>
            <input
              className="long-input-box"
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={loginDetails.password}
              required
            />
          </div>
          {errorMessage !== "" ? (
            <FormErrorMessage message={errorMessage} />
          ) : null}
          <button type="submit" className="auth-btn">
            Login
          </button>
        </div>
      </form>
      <p className="prompt">Don't have an account? <Link to="/register" className="prompt-action">Register Now</Link></p>
    </div>
  )
}
