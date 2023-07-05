const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError } = require("../utils/errors");
require("dotenv").config({ path: "./.env" });
class User {
    constructor() {}
    static async login(user) {
        const query = "SELECT * from users WHERE email=$1;";
        const result = await db.query(query, [user.email.toLowerCase()]);
        if (result.rowCount === 0) {
            throw new UnauthorizedError("email does not exist");
        }
        if (await bcrypt.compare(user.password, result.rows[0].password)) {
            console.log("Successful Login");
        } else {
            throw new UnauthorizedError("email and password does not match");
        }
    }

    static async register(user) {
        const salt = await bcrypt.genSalt(
            parseInt(process.env.BCRYPT_WORK_FACTOR)
        );
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const query =
            "INSERT INTO users (username, password, first_name, last_name, email) values ($1, $2, $3, $4, $5) RETURNING *;";
        const result = await db.query(query, [
            user.username,
            hashedPassword,
            user.firstName,
            user.lastName,
            user.email.toLowerCase(),
        ]);
        return result.rows[0];
    }
    static fetchUserByEmail() {}
}

module.exports = User;
