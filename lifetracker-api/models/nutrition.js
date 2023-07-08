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

  static async fetchFavNutrition(userId){
    const query = "Select name, COUNT (name) as freq FROM nutrition WHERE userid = $1 GROUP BY name ORDER BY freq DESC LIMIT 1;"
    const result = await db.query(query, [userId])
    return {subStatText:"Most Frequent Meal", subStat: result.rows[0]?.name}
  }
  
  static async fetchMaxCaloriesInOneMeal(userId){
    const query = "Select MAX (calories) FROM nutrition WHERE userid = $1 LIMIT 1;"
    const result = await db.query(query, [userId])
    return {subStatText: "Max Calories in One Meal", subStat: parseFloat(result.rows[0].max).toFixed(1)}
  }
  
  static async fetchAvgCalories(userId){
    const query = "Select AVG (calories) FROM nutrition WHERE userid = $1;"
    const result = await db.query(query, [userId])
    return {subStatText: "Average Calories", subStat: parseFloat(result.rows[0].avg).toFixed(1)}
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
