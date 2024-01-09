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

function validateUser(user) {
    const userNameSchema = Joi.object({
      // TO use joi validation you first create the validation schema
      userName: Joi.string().alphanum().min(5).max(10).required(),
      userEmail: Joi.string().min(1).required(),
      userPassword:Joi.string().min(5).max(15).required()
    });
  
    return userNameSchema.validate(user);
  }

  exports.User = User;
  exports.validateUser = validateUser;