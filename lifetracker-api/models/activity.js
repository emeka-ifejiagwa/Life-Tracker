const Nutrition = require("./nutrition")

class Activity{
    static async fetchAllData(userId){
        return await Nutrition.fetchUserNutritionData(userId)
    }
}

module.exports = Activity