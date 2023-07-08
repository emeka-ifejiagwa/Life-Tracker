import  { useState } from "react";
import "./NutritionForm.css";
import { useNavigate } from "react-router-dom";
import FormErrorMessage from "../../Auth-Components/FormErrorMessage/FormErrorMessage";
import axios from "axios";

export default function NutritionForm({ appState, setAppState }) {
  const [nutritionData, setNutritionData] = useState({
    name: "",
    calories: 1,
    imageUrl: "",
    category: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // handles input validation message
  const navigate = useNavigate();

  const url = `http://localhost:3001/nutrition`;

  const handleChange = (event) => {
    setNutritionData({
      ...nutritionData,
      [event.target.name]: event.target.value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        url,
        { nutrition: nutritionData },
        {
          headers: {
            authorization:
              "Bearer " + localStorage.getItem("lifetracker_token"),
          },
        }
      );
      setErrorMessage("");
      setNutritionData({
        name: "",
        calories: 1,
        imageUrl: "",
        category: "",
      });
      setAppState((appState) => {
        return { ...appState, nutritions: [...appState.nutritions, result.data.nutrition]};
      });
        navigate("/nutrition")
    } catch (error) {
      localStorage.clear();
      console.error(error);
      setAppState({
        user: {},
        token: null,
        isAuthenticated: false,
        nutritions: [],
        sleep: [],
        exercise: [],
      });
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="nutrition-form-div">
      <h1>Record Nutrition</h1>
      <form className="nutrition-form" onSubmit={handleSubmit}>
        <div className="long-input-div">
          <label htmlFor="name">Name</label>
          <input
            className="long-input-box"
            type="text"
            placeholder="Name of meal"
            onChange={handleChange}
            name="name"
            value={nutritionData.name}
            required
          />
        </div>
        <div className="long-input-div">
          <label htmlFor="calories">Calories</label>
          <input
            className="long-input-box"
            type="number"
            placeholder="1"
            onChange={handleChange}
            name="calories"
            value={nutritionData.calories}
            required
          />
        </div>
        <div className="long-input-div">
          <label htmlFor="category">Category</label>
          <select
            className="long-input-box"
            placeholder="Username"
            onChange={handleChange}
            name="category"
            value={nutritionData.category}
            required
            style={{ appearance: "none" }}
          >
            <option value>Select a category</option>
            <option value="Fruit">Fruit</option>
            <option value="Meat">Meat</option>
            <option value="Soda">Soda</option>
            <option value="Snack">Snack</option>
            <option value="Nuts">Nuts</option>
            <option value="Beverages">Beverages</option>
            <option value="Food">Food</option>
          </select>
        </div>
        <div className="long-input-div">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            className="long-input-box"
            type="text"
            placeholder="https://www.image.com"
            onChange={handleChange}
            name="imageUrl"
            value={nutritionData.imageUrl}
          />
        </div>
        {errorMessage !== "" ? (
          <FormErrorMessage message={errorMessage} />
        ) : null}
        <button type="submit" className="auth-btn nutrition-save">
          Save
        </button>
      </form>
    </div>
  );
}
