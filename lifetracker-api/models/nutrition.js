const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
require("colors");
require("dotenv").config({ path: "./.env" });

class Nutrition {
  static async fetchUserNutritionData(userId) {
    const query = "SELECT * FROM nutrition WHERE userid = $1;"
    const userNutrition = await db.query(query, [userId])
    return {nutritions: userNutrition.rows}
  }

  static async addNutrition(userId, nutritionData) {
    // validate nutrition data
    if (
      Object.keys(nutritionData).length !== 4 ||
      Object.keys(nutritionData).some(
        (field) => field !== "imageUrl" && (nutritionData.field || nutritionData.field === "")
      )
    )
      throw new BadRequestError("some required fields are missing");

    const query =
      "INSERT INTO nutrition (userid, name, category, calories, imageurl) values ($1, $2, $3, $4, $5) RETURNING *;";
    const newNutritionEntry = await db.query(query, [
      userId,
      nutritionData.name,
      nutritionData.category,
      nutritionData.calories,
      nutritionData.imageurl,
    ]);
    return { nutrition: newNutritionEntry.rows[0] };
  }
}

module.exports = Nutrition;
