const express = require("express")
const { authenticateToken } = require("../middleware/security")
const User = require("../models/user")
const nutritionRouter = express.Router()

nutritionRouter.get("/", (req, res) => {
    
})

nutritionRouter.post("/", authenticateToken, async (req, res) => {
    try{
        const id = res.locals.payload.id
    const newNuttritionEntry = await User.addNutrition(id, req.body.nutrition)
    res.status(201).send(newNuttritionEntry)
    }catch(error){
        console.error(error)
        res.status(error.status).send({message: error.message})
    }
})

module.exports = nutritionRouter