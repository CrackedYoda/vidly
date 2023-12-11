const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");
const Joi = require("joi");

const moviesSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    minLength: 1,
    maxLength: 255,
  },
  genre: { type:  genreSchema, 
    required: true },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
    
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min:0,
    max:255
  } 
});

function validate(item) {
    const movieValidation = Joi.object({
      // TO use joi validation you first create the validation schema
      title: Joi.string().alphanum().min(1).max(255).required(),
      genre: required(),
      numberInStock: Joi.number().min(1).max(255),
      dailyRentalRate: Joi.number().min(1).max(255)
    });
  
    return movieValidation.validate(item);
  }
const Movies = mongoose.model("movie", moviesSchema);

exports.Movies = Movies;
exports.Validate = validate;
