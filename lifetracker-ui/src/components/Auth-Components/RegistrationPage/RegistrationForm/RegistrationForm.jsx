import { useState } from "react";
import "./RegistrationForm.css";
import { ImUserPlus } from "react-icons/im";
import { IconContext } from "react-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FormErrorMessage from "../../FormErrorMessage/FormErrorMessage";

export default function RegistrationForm({
  setAppState
}) {
  const [registrationInfo, setRegistrationInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // handles input validation message
  const navigate = useNavigate()

  const url = `https://life-tracker-uj12.onrender.com/auth/register`;

  const handleChange = (event) => {
    setRegistrationInfo({
      ...registrationInfo,
      [event.target.name]: event.target.value,
    });
    setErrorMessage("")
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(url, registrationInfo);
      setErrorMessage("")
      setRegistrationInfo({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      });
      localStorage.setItem("lifetracker_token", result.data.token)
      setAppState(appState => {return {...appState, user: {...result.data.user}, token: result.data.token, isAuthenticated: true}})
      navigate("/activity")
    } catch(error){
      console.error(error)
      localStorage.clear()
      setAppState({
        user: {},
        token: null,
        isAuthenticated: false,
        nutritions: [],
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
          {errorMessage !== "" ? (
            <FormErrorMessage message={errorMessage} />
          ) : null}
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </div>
      </form>
      <p className="prompt">Already have an account? <Link to="/login" className="prompt-action">Log in</Link></p>
    </div>
  );
}
