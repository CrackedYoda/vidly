const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const {Rental, validateRental}= require('../models/rentals');
const router = express.Router(); //initializing express.Router()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("rental db running");
  })
  .catch((err) => console.log(err));

  router.post ("/rentals",async(req,res)=>

  {
    let newRental = new Rental ({
      customer : {
        name: req.body.customername,
        isGold: req.body.customerstatus,
        phone: req.body.customernummber 
      },
      movie: {
        title:req.body.movietitle,
        dailyRentalRate: req.body.dailyrentalrate
      },
      dateOut: req.body.dateout,
      dateReturned: req.body.datereturned,
      rentalFee:20

    } )

    newRental.save()
    .then(()=>{
      console.log(newRental)
    })
    .catch((error)=>{console.log(error._message)})
  }
) 
  
  // createRental();



 module.exports = router