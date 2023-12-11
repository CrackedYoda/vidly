const Joi = require("joi");
const mongoose = require("mongoose");

function validate(item) {
    const genrenameschema = Joi.object({
      // TO use joi validation you first create the validation schema
      genre: Joi.string().alphanum().min(1).required(),
    });
  
    return genrenameschema.validate(item);
  }

  const genreSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
    },
  });
  
  const Genres = mongoose.model("genre", genreSchema);

  exports.Genres = Genres;
  exports.validate = validate;
  exports.genreSchema = genreSchema;                            