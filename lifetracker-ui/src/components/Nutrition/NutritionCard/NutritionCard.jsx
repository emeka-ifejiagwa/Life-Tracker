import React from "react";
import "./NutritionCard.css";

export default function NutritionCard({ nutrition }) {
  return (
    <div className="nutrition-card">
     <header className="nutrition-header">
     {nutrition.imageurl ? (
        <img className="nutrition-image" src={nutrition.imageurl} />
      ) : (
        <div className="nutrition-image">
            {nutrition.name.charAt(0)}
        </div>
      )}
     </header>
      <div className="nutrition-details">
      <div className="nutrition-name">{nutrition.name}</div>
      <table className="nutrition-description-table">
        <tr>
            <th>Category</th>
            <th>Calories</th>
            <th>Created at</th>
        </tr>
        <tr>
            <td>{nutrition.category}</td>
            <td>{nutrition.calories}</td>
            <td>{nutrition.createdat.split("T")[0]}</td>
        </tr>

      </table>
      </div>
    </div>
  );
}
