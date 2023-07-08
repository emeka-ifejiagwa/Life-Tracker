import React, { useEffect } from "react";
import "./NutritionOverview.css";
import NutritionFeed from "./NutritionFeed/NutritionFeed";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NutritionOverview({ appState, setAppState }) {
  const url = "http://localhost:3001/nutrition/";
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("lifetracker_token"),
        },
      })
      .then((response) =>
        setAppState({
          ...appState,
          nutritions: response.data.nutritions,
        })
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
  }, []);
  return appState.isAuthenticated ? (
    <div className="nutrition-overview">
      <Link to="./create" className="add-nutrition-link">
        <button className="add-nutrition">Record Nutrition</button>
      </Link>
      <NutritionFeed nutritions={appState.nutritions} />
    </div>
  ) : (
    <p className="activity">Please register or log in</p>
  );
}
