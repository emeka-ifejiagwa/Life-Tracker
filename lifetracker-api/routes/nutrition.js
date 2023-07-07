const express = require("express")
const { authenticateToken } = require("../middleware/security")
const Nutrition = require("../models/nutrition")
const nutritionRouter = express.Router()

nutritionRouter.get("/", authenticateToken, async (req, res) => {
    try{
        const payload = res.locals.payload
        if(Object.keys(payload).length === 0) res.status(403).send({error: "Unable to verify token"})
        else{
            const id = res.locals.payload.id
        const userNutrition = await Nutrition.fetchUserNutritionData(id)
        res.status(201).send(userNutrition)
        } 
    }catch(error){
        console.error(error)
        res.status(error.status).send({message: error.message})
    }
})

nutritionRouter.post("/", authenticateToken, async (req, res) => {
    try{
        const id = res.locals.payload.id
    const newNuttritionEntry = await Nutrition.addNutrition(id, req.body.nutrition)
    res.status(201).send(newNuttritionEntry)
    }catch(error){
        console.error(error)
        res.status(error.status).send({message: error.message})
    }
})

module.exports = nutritionRouter