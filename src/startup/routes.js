// const express = require('express')
const home = require("../controller/home");
const users = require("../controller/users");
const error = require("../middleware/error");
const auth = require("../controller/auth");

module.exports = function(app) {
  // app.use(express.json())
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use(error);
};
