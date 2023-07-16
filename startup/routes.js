const express = require("express");
const genres = require("../routes/genres");
const customer = require("../routes/customer");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/vidly/api/genres", genres);
  app.use("/vidly/api/customers", customer);
  app.use("/vidly/api/movies", movies);
  app.use("/vidly/api/rentals", rentals);
  app.use("/vidly/api/users", users);
  app.use("/vidly/api/auth", auth);
  // error middleware is added after all route handlers
  // anytime we call next when there is an exception it will end up here calling the error middleware
  app.use(error);
  app.get("/", (req, res) => {
    res.send("vidly movie renting service");
  });
};
