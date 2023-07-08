import { useEffect, useState } from "react";
import "./ActivityPage.css";
import { Link } from "react-router-dom";
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
      <div className="activity-header">
      <h4 style={{lineHeight: "100%"}}>Activity Feed</h4>
      <Link to="/nutrition/create" className="add-nutrition-link" style={{width: "auto"}}>
        <button className="add-nutrition" style={{width: "10rem"}}>Record Nutrition</button>
      </Link>
      </div>
      <ActivityFeed avgDailyCalories={activityData.nutritionActivity?.avgDailyCalories}
      totalCaloriesPerDay={activityData.nutritionActivity?.totalDailyCalories} 
      subNutritionStats={activityData.nutritionActivity?.subStats}/>
    </Link>
  ) : (
    <p className="activity">Please register or log in</p>
  );
}
