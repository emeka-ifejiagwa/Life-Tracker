const { verifyToken } = require("../utils/tokens");

function authenticateToken(req, res, next) {
  /*
      this extracts the token from the request header
      Note: we directly set the headder to include the specific field "authorization"
  */
  const token = req.headers.authorization?.split(" ")[1];
  try{
    res.locals.payLoad = verifyToken(token)
    next()
  }catch(error){
    res.locals.error = error
  }
}

module.exports = { authenticateToken}
