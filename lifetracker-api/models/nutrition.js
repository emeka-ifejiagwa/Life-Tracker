const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
require("colors");
require("dotenv").config({ path: "./.env" });

class Nutrition {
  static async fetchUserNutritionData(userId) {
    const query = "SELECT * FROM nutrition WHERE userid = $1 ORDER BY createdat DESC;"
    const userNutrition = await db.query(query, [userId])
    return {nutritions: userNutrition.rows}
  }

  static async fetchAvgDailyCalories(userId){
    const userNutritionData = (await this.fetchUserNutritionData(userId)).nutritions
    if(userNutritionData.length === 0) return 0
    const today = `${userNutritionData[0].createdat}`.split(" ", 4).join(" ")
    let count = 0
    const total = userNutritionData.reduce((acc, nutrition) => {
      if(`${nutrition.createdat}`.split(" ", 4).join(" ") === today){
        acc += parseFloat(nutrition.calories)
        count += 1
      }
      return acc
    }, 0)
    return {totalDailyCalories: total, avgDailyCalories: total/count}
    
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
      nutritionData.imageUrl,
    ]);
    return { nutrition: newNutritionEntry.rows[0] };
  }
}

module.exports = Nutrition;
