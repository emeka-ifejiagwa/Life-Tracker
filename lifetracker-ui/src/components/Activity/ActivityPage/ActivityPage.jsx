import React, { useEffect } from "react";
import "./ActivityPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ActivityFeed from "../Activity Feed/ActivityFeed";

export default function ActivityPage({ appState, setAppState }) {

  useEffect(() => {
    const url = `http://localhost:3001/activity`;
    axios
      .get(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
        },
      })
      .then((userActivities) =>
      userActivities.status === 200
          ? setAppState({ ...appState, ...userActivities.data, isAuthenticated: true })
          : null
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

  const getCaloriesConsumedPerCategory = (nutritions) => {
    const entryTotals = nutritions.reduce((acc, nutrition) => {
      if(nutrition.category in acc){
        acc[nutrition.category].total += parseFloat(nutrition.calories)
        acc[nutrition.category].count += 1
      }
      else{
        acc[nutrition.category] = {total: parseFloat(nutrition.calories), count: 1}
      }
    return acc}, ({}))
    Object.keys(entryTotals).forEach(category => entryTotals[category] =entryTotals[category].total/entryTotals[category].count )
    return entryTotals
  }

  return appState.isAuthenticated ? (
    <Link to="/activity" className="activity">
      <h4 style={{lineHeight: "100%"}}>Activity Feed</h4>
      <ActivityFeed avgCaloriesPerCategory={getCaloriesConsumedPerCategory(appState.nutritions)} />
    </Link>
  ) : (
    <p className="activity">Not authotized</p>
  );
}
