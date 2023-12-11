const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, minLength: 1, maxLength: 255 },
      isGold: { type: Boolean, default: false },
      phone: { type: Number, min: 1},
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },  
});
 const Rental = mongoose.model("rental",rentalSchema)

 function validateRental(item) {
  const rentalValidation = Joi.object({
    // TO use joi validation you first create the validation schema
    customer: Joi.string().required(),
    movie: Joi.string().required()
  });

  return rentalValidation.validate(item);
}


exports.Rental = Rental;
exports.validateRental = validateRental;