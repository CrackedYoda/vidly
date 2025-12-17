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


const Movies = mongoose.model("movie", moviesSchema);

exports.Movies = Movies;
