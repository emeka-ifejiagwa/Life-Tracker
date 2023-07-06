const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { generateToken } = require("../utils/tokens");

authRouter.post("/register", async (req, res) => {
  try {
    const result = await User.register(req.body);
    res.status(200).send({ ...result, password: req.body.password });
  } catch (error) {
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

module.exports = authRouter;
