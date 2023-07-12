const express = require("express")
const authRouter = require("./routes/auth")
const activityRouter = require("./routes/activity")
require("colors")
const morgan = require("morgan")
const cors = require("cors")
const followersRoute = require("./routes/followers")
const nutritionRouter = require("./routes/nutrition")

const app = express()

app.use(cors()) // the placement of cors matters
app.use(morgan("tiny"))
app.use(express.json())
app.use("/auth", authRouter)
app.use("/activity", activityRouter)
app.use("/nutrition", nutritionRouter)
app.use("/followers", followersRoute)

module.exports = app