import Joi from "joi";

export function validateRental(item) {
  const rentalValidation = Joi.object({
    // TO use joi validation you first create the validation schema
    customerid: Joi.string().required(),
    movieid: Joi.string().required()
  });

  return rentalValidation.validate(item);
}

export function validateMovie(item) {
  const movieValidation = Joi.object({
    // TO use joi validation you first create the validation schema
    title: Joi.string().min(1).max(255).required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(100).required()
  });

  return movieValidation.validate(item);
}

export const validateUser = (user) => {
  const userNameSchema = Joi.object({
    // TO use joi validation you first create the validation schema
    userName: Joi.string().min(5).max(10).required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().min(5).max(15).required()
  });

  return userNameSchema.validate(user);
};

export function validateCustomer(item) {
  const customerNameSchema = Joi.object({
    // TO use joi validation you first create the validation schema
    name: Joi.string().min(1).max(50).required(),
    phone: Joi.string().pattern(/^\d{10,15}$/).required()
  });

  return customerNameSchema.validate(item);
}

export function validateGenre(item) {
  const genrenameschema = Joi.object({
    // TO use joi validation you first create the validation schema
    genre: Joi.string().min(1).max(50).required()
  });

  return genrenameschema.validate(item);
}
