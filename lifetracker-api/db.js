const {Client} = require("pg")
const getDatabaseURI = require("./config")
require("colors")

const db = new Client({connectionString: getDatabaseURI()})
db.connect((error) => {
    if(error){ console.error("connection error".red, error.stack)}
    else{ console.log("connection successful".green)}
})


module.exports = db