const express = require("express")
const authRouter = require("./routes/auth")
const activityRouter = require("./routes/activity")
require("colors")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(cors()) // the placement of cors matters
app.use(morgan("tiny"))
app.use(express.json())
app.use("/auth", authRouter)
app.use("/activity", activityRouter)

module.exports = app