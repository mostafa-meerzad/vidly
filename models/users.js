const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 55,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
})

userSchema.methods.generateToken = function(){
  const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"))
  return token
}

const User = mongoose.model(
  "users",
  userSchema
);

function userValidator(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(55).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = userValidator;
