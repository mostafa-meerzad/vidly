// const mongoose = require("mongoose")
// registering a new user
const auth = require("../middleware/auth");
const express = require("express");
const { User, validate } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/me", auth,async (req,res)=>{
  // we set the req.user._id in the auth middleware
  const user = await User.findById(req.user._id).select("-password")
  // console.log(user);
  res.send(user)
  res.end()
})

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");
// use lodash to remove repetitive code
  //   user = new User({
  // name: req.body.name,
  // email: req.body.email,
  // password: req.body.password,
  //   });

  // replace with lodash
  user = new User(_.pick(req.body, ["name", "email", "_id", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  //   res.send(user);
  // Information Expert Principle
  // const token = jwt.sign({_id:user._id}, config.get("jwtPrivateKey"))
  const token = user.generateToken()
  res.header("x-auth-token", token).send(_.pick(user, ["name", "_id", "email"]));
});

module.exports = router;
