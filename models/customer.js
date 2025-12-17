const mongoose = require("mongoose");
const Joi = require("joi");


 
  const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    phone: { type: Number, minlength: 11, maxlength: 20 },
  });
  
  const Customers = mongoose.model("customer", customerSchema);

  exports.Validate = validate;
  exports.Customers = Customers;