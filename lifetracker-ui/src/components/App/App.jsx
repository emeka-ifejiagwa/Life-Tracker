import Navbar from "../Navbar/Navbar";
import "./App.css";
import RegistrationPage from "../Auth-Components/RegistrationPage/RegistrationPage/RegistrationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "../Auth-Components/Login/LoginPage/LoginPage";
import axios from "axios";
import LandingPage from "../LandingPage/LandingPage";
import ActivityPage from "../Activity/ActivityPage/ActivityPage";
import NutritionPage from "../Nutrition/NutritionPage/NutritionPage";

function App() {
  /* 
  part of the user object is the token stored in the local storage
   we need this value anytime we make a request to the api
   at the initial render, the local storage would not have the token and thus the user would not be authenticated
  */

  const [appState, setAppState] = useState({
    user: {},
    token: localStorage.getItem("lifetracker_token"),
    // if we still have our token, we are still authenticated
    isAuthenticated: Boolean(localStorage.getItem("lifetracker_token")),
    nutritions: [],
    sleep: [],
    exercise: [],
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar appState={appState} setAppState={setAppState} />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/activity"
            element={
              <ActivityPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/nutrition/*"
            element={
              <NutritionPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage appState={appState} setAppState={setAppState} />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPage appState={appState} setAppState={setAppState} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
