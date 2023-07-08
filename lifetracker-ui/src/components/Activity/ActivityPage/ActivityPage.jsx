import React, { useEffect, useState } from "react";
import "./ActivityPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityFeed from "../Activity Feed/ActivityFeed";

export default function ActivityPage({ appState, setAppState }) {
  const [activityData, setActivityData] = useState({})
  useEffect(() => {
    const url = `http://localhost:3001/activity`;
    axios
      .get(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
        },
      })
      .then((userActivities) =>{
        setAppState({ ...appState, isAuthenticated: true })
        setActivityData({...activityData, nutritionActivity: userActivities.data.nutritionActivity})
      }
      )
      .catch((error) => {
        localStorage.clear();
        setAppState({
          user: {},
          token: undefined,
          isAuthenticated: false,
          nutritions: [],
          sleep: [],
          exercise: [],
        });
      });
  }, [appState.isAuthenticated]);


  return appState.isAuthenticated ? (
    <Link to="/activity" className="activity">
      <h4 style={{lineHeight: "100%"}}>Activity Feed</h4>
      <ActivityFeed avgDailyCalories={activityData.nutritionActivity?.avgDailyCalories}
      totalCaloriesPerDay={activityData.nutritionActivity?.totalDailyCalories} />
    </Link>
  ) : (
    <p className="activity">Not authotized</p>
  );
}
