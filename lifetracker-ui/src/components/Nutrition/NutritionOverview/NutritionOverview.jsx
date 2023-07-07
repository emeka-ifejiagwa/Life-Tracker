import React from "react";
import "./NutritionOverview.css";
import NutritionFeed from "./NutritionFeed/NutritionFeed";
import { Link } from "react-router-dom";

export default function NutritionOverview({ appState, setAppState }) {
  return (
    <div className="nutrition-overview">
      <Link to="./create" className="add-nutrition-link">
        <button className="add-nutrition">
          Record Nutrition
          </button>
      </Link>
      <NutritionFeed nutritions={[]} />
    </div>
  );
}
