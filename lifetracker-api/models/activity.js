const Nutrition = require("./nutrition")

class Activity{
    static async fetchAllData(userId){
        return await Nutrition.fetchUserNutritionData(userId)
    }

    static async fetchAvgDailyCalories(userId){
        return await Nutrition.fetchAvgDailyCalories(userId)
    }

    static async fetchActivityInfo(userId){
        return {
            nutritionActivity: {
                ...( await this.fetchAvgDailyCalories(userId))
            }
        }
    }
}

module.exports = Activity