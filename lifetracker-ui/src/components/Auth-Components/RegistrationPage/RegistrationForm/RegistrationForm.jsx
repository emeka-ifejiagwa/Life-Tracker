import React, { useEffect, useState } from "react";
import "./RegistrationForm.css";
import { ImUserPlus } from "react-icons/im";
import { IconContext } from "react-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegistrationForm({
  setIsLoggedIn
}) {
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const url = `http://localhost:3001/auth/register`;

  const handleChange = (event) => {
    setRegistrationInfo({
      ...registrationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post(url, registrationInfo);
    if (result.status === 200) {
      setRegistrationInfo({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      });
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="auth-div">
      <header className="auth-header">
        <IconContext.Provider
          value={{ color: "var(--button-color)", size: "4.5rem" }}
        >
          <ImUserPlus className="user-icon" />
        </IconContext.Provider>
        <h2>Create an Account</h2>
      </header>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="names">
            <label htmlFor="first-name"></label>
            <input
              className="name-input-box"
              type="text"
              placeholder="Firstname"
              onChange={handleChange}
              name="firstName"
              value={registrationInfo.firstName}
              required
            />
            <label htmlFor="last-name"></label>
            <input
              className="name-input-box"
              type="text"
              placeholder="Lastname"
              onChange={handleChange}
              name="lastName"
              value={registrationInfo.lastName}
              required
            />
          </div>
          <div className="long-input-div">
            <label htmlFor="email"></label>
            <input
              className="long-input-box"
              type="email"
              placeholder="example@domain.com"
              onChange={handleChange}
              name="email"
              value={registrationInfo.email}
              required
            />
          </div>
          <div className="long-input-div">
            <label htmlFor="email"></label>
            <input
              className="long-input-box"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              name="username"
              value={registrationInfo.username}
              required
            />
          </div>
          <div className="long-input-div">
            <label htmlFor="email"></label>
            <input
              className="long-input-box"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={registrationInfo.password}
              required
            />
          </div>
          <div className="long-input-div">
            <label htmlFor="email"></label>
            <input
              className="long-input-box"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              name="passwordConfirm"
              value={registrationInfo.passwordConfirm}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </div>
      </form>
      <p className="prompt">Already have an account? <Link to="/login" className="prompt-action">Log in</Link></p>
    </div>
  );
}
