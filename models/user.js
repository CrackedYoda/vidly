const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        unique: true,
        type: String,
        maxLength: 255
      },
      password: {
        type: String,
        minLength:4,
        maxLength:1024,
        
      }


})
const User = mongoose.model("user",userSchema);


  exports.User = User;
 