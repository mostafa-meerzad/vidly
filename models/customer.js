const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
  
  const Customer = mongoose.model("customers", customerSchema);
  
  function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
      phone: Joi.string().required(),
      isGold: Joi.boolean().required(),
    });
  
    return schema.validate(user);
  }

  exports.validate = validateUser
  exports.Customer = Customer