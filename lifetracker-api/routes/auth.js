const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const result = await User.register(req.body);
    res.status(200).send({ ...result, password: req.body.password });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await User.login(req.body);
    res.status(200).send({ ...result, password: req.body.password });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
