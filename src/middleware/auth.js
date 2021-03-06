const jwt = require("jsonwebtoken");
const {REQUIRE_AUTH, SECRET_KEY} = require("../startup/config");

module.exports = function(req, res, next) {

  if (!REQUIRE_AUTH) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, SECRET_KEY );
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
