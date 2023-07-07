import React, { useEffect } from "react";
import "./ActivityPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityFeed from "../Activity Feed/ActivityFeed";

export default function ActivityPage({ appState, setAppState }) {
    const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:3001/activity`;
    axios
      .get(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
        },
      })
      .then((res) =>
        res.status === 200
          ? setAppState({ ...appState, isAuthenticated: true })
          : null
      )
      .catch((error) => {
        localStorage.clear();
        setAppState({
          user: {},
          token: undefined,
          isAuthenticated: false,
          nutrition: [],
          sleep: [],
          exercise: [],
        });
      });
  }, [appState.isAuthenticated]);

  return appState.isAuthenticated ? (
    <Link to="/activity" className="activity">
      <div className="home">Welcome to Life Tracker</div>
      <ActivityFeed appState={appState} setAppState={setAppState} />
    </Link>
  ) : (
    <p className="activity">Not authotized</p>
  );
}
