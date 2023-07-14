const jwt = require("jsonwebtoken");
const config = require("config");


function auth(req, res, next) {

  console.log("auth middleware called");
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied no token provided");

  try {
    const decode = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decode; // decode has the user-id as we included earlier and we are accessing it to get the current user later in the app
    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }

}

module.exports = auth;
