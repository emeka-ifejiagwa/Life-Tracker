import React, { useEffect } from "react";
import "./NutritionPage.css";
import { Route, Routes } from "react-router-dom";
import NutritionOverview from "../NutritionOverview/NutritionOverview";
import NutritionNew from "../NutritionNew/NutritionNew";
import NutritionDetail from "../NutritionDetail/NutritionDetail";
import PageBanner from "../../PageBanner/PageBanner";

export default function NutritionPage({ appState, setAppState }) {
  return appState.isAuthenticated ? (
    <div className="nutrition-page">
      <PageBanner text="Nutrition" bgColor="var(--nutrition-color)" />
      <Routes>
        <Route
          path="/"
          element={
            <NutritionOverview appState={appState} setAppState={setAppState} />
          }
        />
        <Route
          path="/create"
          element={
            <NutritionNew appState={appState} setAppState={setAppState} />
          }
        />
        <Route
          path="/id/:nutritionId"
          element={
            <NutritionDetail appState={appState} setAppState={setAppState} />
          }
        />
      </Routes>
    </div>
  ) : (
    <p className="activity"> Please register or log in</p>
  );
}
