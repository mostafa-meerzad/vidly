const Joi = require("joi")
const mongoose = require("mongoose");


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    }
})

const Genre = mongoose.model("genre", genreSchema)

function validator(genre) {
    const schema = Joi.object({
        name: Joi.string().required().min(5)
    })
    return schema.validate(genre)
}

exports.Genre = Genre
exports.validate = validator
exports.genreSchema = genreSchema