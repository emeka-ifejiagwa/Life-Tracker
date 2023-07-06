import React, { useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home({
  isLoggedIn,
  setIsLoggedIn,
  appState,
  setAppState,
}) {
  useEffect(() => {
    const url = `http://localhost:3001/activity`;
    axios.get(url, {headers:  {authorization: "Bearer " + localStorage.getItem("lifetracker_token")}})
    .then(res => res.status === 200 ? setAppState({...appState, isAuthenticated: true}): null)
    .catch(error =>
      setAppState({
        user: {token: localStorage.getItem("lifetracker_token")}, // {userDetails: ..., token: ...}
        isAuthenticated: false,
        nutrition: [],
        sleep: [],
        exercise: [],
      }))
  }, [appState.isAuthenticated]);
  return appState.isAuthenticated ? (
    <Link to="/" className="home">
      <div className="home">Welcome to Life Tracker</div>
    </Link>
  ) : (
    <></>
  );
}
