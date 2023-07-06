const express = require("express");
const activityRouter = express.Router();
const User = require("../models/user");
const { authenticateToken } = require("../middleware/security");

activityRouter.get("/", authenticateToken, async (req, res) => {
    try{
        res.send("hello")
    }catch(error){
        res.status(error.status).send(error.message)
    }
})

module.exports = activityRouter