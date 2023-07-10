const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("../models/genres");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  genre: {
    type: genreSchema,
  },
});

function validator(movie) {
  const movieSchema = Joi.object({
    title: Joi.string().min(5).max(50),
    genre: Joi.string(),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255),
  });

  return movieSchema.validate(movie);
}

const Movie = mongoose.model("movie", movieSchema);

exports.validator = validator;
exports.Movie = Movie;