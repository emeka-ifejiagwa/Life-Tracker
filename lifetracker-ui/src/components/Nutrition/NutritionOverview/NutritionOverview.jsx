import React, { useEffect } from "react";
import "./NutritionOverview.css";
import NutritionFeed from "./NutritionFeed/NutritionFeed";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NutritionOverview({ appState, setAppState }) {
  const url = "http://localhost:3001/nutrition/"
  useEffect(() => {
    axios.get(url, {
      headers: {
        authorization:
          "Bearer " + localStorage.getItem("lifetracker_token"),
      },
    }).then(nutritions =>
      setAppState({...appState, nutritions: nutritions.data.nutritions })
      )
  }, [])
  return (
    <div className="nutrition-overview">
      <Link to="./create" className="add-nutrition-link">
        <button className="add-nutrition">
          Record Nutrition
          </button>
      </Link>
      <NutritionFeed nutritions={appState.nutritions} />
    </div>
  );
}
