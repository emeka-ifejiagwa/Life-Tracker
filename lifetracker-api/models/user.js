const db = require("../db");
const bcrypt = require("bcrypt");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
require("colors");
require("dotenv").config({ path: "./.env" });
class User {
  
  static async fetchUserByEmail(email) {
    const query = "SELECT * from users WHERE email=$1;";
    return await db.query(query, [email.toLowerCase()]);
  }

  static async login(user) {
    const result = await this.fetchUserByEmail(user.email);
    // if we were unable to fetch from the database
    if (!result) {
      throw new Error("an error occured");
    }
    // if there is no matching email
    if (result.rowCount === 0) {
      throw new UnauthorizedError("email does not exist");
    }
    // if the password does match
    if (await bcrypt.compare(user.password, result.rows[0].password)) {
      console.log("Successful Login".green);
      return result.rows[0];
    } else {
      throw new UnauthorizedError("email and password does not match");
    }
  }

  static async register(user) {
    // TODO handle errors
    if (user.password !== user.passwordConfirm) {
      throw new UnauthorizedError("passwords do not match");
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_WORK_FACTOR));
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

  static async getAllUsers(){
    const query = "SELECT * from users;";
    const users = (await db.query(query)).rows
    return users.map(user => ({created_at: user.created_at, username: user.username, id: user.id }))
  }
}

module.exports = User;
