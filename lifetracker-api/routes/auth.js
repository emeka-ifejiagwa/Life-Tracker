const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { generateToken, verifyToken } = require("../utils/tokens");

authRouter.post("/register", async (req, res) => {
  try {
    const user = await User.register(req.body);
    const token = generateToken(user)
    delete user.password
    res.status(200).json({user, token});
  } catch (error) {
    console.error(error)
    res.status(401).send({ message: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body);
    const token = generateToken(user)
    delete user.password
    res.status(200).json({user, token});
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: error.message });
  }
});

authRouter.post("/me", async (req, res) => {
  try {
    const user = verifyToken(req.headers.authorization?.split(" ")[1])
    res.status(200).json({user});
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: error.message });
  }
});



module.exports = authRouter;
