const express = require("express");
const activityRouter = express.Router();
const User = require("../models/user");
const { authenticateToken } = require("../middleware/security");

activityRouter.get("/", authenticateToken, async (req, res) => {
    try{
        const payload = res.locals.payload
        if(Object.keys(payload).length === 0) res.status(403).send({error: "Unable to verify token"})
        else{res.status(200).send(payload)}
    }catch(error){
        res.status(error.status).send(error.message)
    }
})

module.exports = activityRouter