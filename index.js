const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customer = require("./routes/customer");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users")
const auth = require("./routes/auth");
const config = require("config");
const error = require("./middleware/error")

if(!config.get("jwtPrivateKey")){
  console.error("Fatal error jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/vidly/api/genres", genres);
app.use("/vidly/api/customers", customer);
app.use("/vidly/api/movies", movies);
app.use("/vidly/api/rentals", rentals);
app.use("/vidly/api/users", users)
app.use("/vidly/api/auth", auth)
// error middleware is added after all route handlers
// anytime we call next when there is an exception it will end up here calling the error middleware
app.use(error)
app.get("/", (req, res) => {
  res.send("vidly movie renting service");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port: ", port);
});
