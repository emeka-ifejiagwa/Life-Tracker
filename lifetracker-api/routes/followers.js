const express = require("express");
const followersRoute = express.Router();
const Followers = require("../models/followers");
const { authenticateToken } = require("../middleware/security");

followersRoute.get("/", authenticateToken, async (req, res) => {
    try{
        const id = res.locals.payload.id
        res.status(200).send(await Followers.getFollowersAndFollowing(id))
    }catch(error){
        console.error(error.message)
        res.send({message: error.message})
    }
})

followersRoute.post("/", authenticateToken, async(req, res) => {
    try{
        const id = res.locals.payload.id
        await Followers.addNew(id, req.body.wasFollowedId)
        res.status(200).send(await Followers.getFollowersAndFollowing(id))
    } catch(error){
        console.error(error.message)
        res.send({message: "could not follow"})
    }
})

module.exports = followersRoute