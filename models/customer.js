const mongoose = require("mongoose");
const Joi = require("joi");


 function validate(item) {
    const customerNameSchema = Joi.object({
      // TO use joi validation you first create the validation schema
      name: Joi.string().alphanum().min(1).max(10).required(),
      phone: Joi.number().min(11).required(),
    });
  
    return customerNameSchema.validate(item);
  }
  
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
  
  const Customers = new mongoose.model("customer", customerSchema);

  exports.Validate = validate;
  exports.Customers = Customers;