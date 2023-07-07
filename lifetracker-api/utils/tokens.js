const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("./errors");
require("dotenv").config();

function generateToken(user) {
  const payload = {
    id: user.id,
    userName: user.userName,
    email: user.email,
    name: user.firstName + " " + user.lastName,
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'});
}

function verifyToken(token) {
  if (typeof token !== "string")
    return { message: `token not a string, its a ${typeof token}` };
  if (!token) throw new UnauthorizedError("user is not authorized", 403);

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      throw new UnauthorizedError("user is not authorized", 403);
    }
  });
  return jwt.decode(token);
}


module.exports = { generateToken, verifyToken };
