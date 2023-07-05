const express = require("express")
const router = require("./routes/auth")
require("colors")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(cors()) // the placement of cors matters
app.use(morgan("tiny"))
app.use(express.json())
app.use("/auth", router)

module.exports = app