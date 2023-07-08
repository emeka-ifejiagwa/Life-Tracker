const express = require("express");
const activityRouter = express.Router();
const Activity = require("../models/activity");
const { authenticateToken } = require("../middleware/security");

activityRouter.get("/", authenticateToken, async (req, res) => {
    try{
        const payload = res.locals.payload
        if(Object.keys(payload).length === 0 || !payload.id) res.status(403).send({error: "Unable to verify token"})
        else{
           const result = await Activity.fetchActivityInfo(payload.id)
            res.status(201).send(result)
        }
    }catch(error){
        console.error(error)
        res.status(error.status).send(error.message)
    }
})

module.exports = activityRouter