const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3,
        maxLength:50
    },
    phone: {
        type: String,
        required: true,
        minLength:3,
        maxLength:50
    },
    isGold: {
        type: Boolean,
        required: true,
    },
  });
  
  const User = mongoose.model("users", userSchema);
  
  function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      phone: Joi.string().required(),
      isGold: Joi.boolean().required(),
    });
  
    return schema.validate(user);
  }

  exports.validate = validateUser
  exports.User = User