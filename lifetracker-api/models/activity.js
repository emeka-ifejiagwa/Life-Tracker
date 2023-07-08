const Nutrition = require("./nutrition")

class Activity{
    static async fetchAllData(userId){
        return await Nutrition.fetchUserNutritionData(userId)
    }

    static async fetchAvgDailyCalories(userId){
        return await Nutrition.fetchAvgDailyCalories(userId)
    }

    static async fetchMostFrequentNutrition(userId){
        return await Nutrition.fetchFavNutrition(userId)
    }

    static async fetchHighestCalories(userId){
        return await Nutrition.fetchMaxCaloriesInOneMeal(userId)
    }
    
    static async fetchAvgCalories(userId){
        return await Nutrition.fetchAvgCalories(userId)
    }

    static async fetchActivityInfo(userId){
        return {
            nutritionActivity: {
                ...( await this.fetchAvgDailyCalories(userId)),
                subStats: [
                (await this.fetchHighestCalories(userId)),
                (await this.fetchAvgCalories(userId)),
                (await this.fetchMostFrequentNutrition(userId))]
            }
        }
    }
}

module.exports = Activity