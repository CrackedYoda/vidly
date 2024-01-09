const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { Rental, validateRental } = require("../models/rentals");
const { Movies } = require("../models/movies");
const { Customers } = require("../models/customer");
const router = express.Router(); //initializing express.Router()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("rental db running");
  })
  .catch((err) => console.log(err));

router.get("/", async (req, res) => {
  let rental = await Rental.find();
  if (!rental) console.log("no rentals found");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error, value } = validateRental(req.body);
  if (error) {
    return res.status(400).send(`a joi errror = ${error.details[0].message}`);
  } else {
    let movie = await Movies.findById(req.body.movieid);
    if (!movie) 
      return res.status(404).send("movieId invalid");
    

    let customer = await Customers.findById(req.body.customerid);
    if (!customer) 
      return res.status(404).send("customerId invalid");
    

    let newRental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        isGold: customer.isGold,
        phone: customer.phone,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      dateOut: 2023-12-9,
      dateReturned: 2023-12-12,
      rentalFee: 50,
    });
    
    newRental
      .save()
      .then(() => {
        return console.log(newRental);
      })
      .catch((error) => {
        console.log(error._message);
      });

      movie.numberInStock--;
      movie.save()
      .then(() => {
        return console.log(movie);
      })
      .catch((error) => {
        console.log(error._message); 
      });
      
  }
});

// createRental();

module.exports = router;
