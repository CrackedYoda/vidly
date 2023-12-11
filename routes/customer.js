const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const {Customers, Validate}= require('../models/customer')
const router = express.Router(); //initializing express.Router()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("customer db running");
  })
  .catch((err) => console.log(err));



// async function createCustomer() {
//   const first = new Customers({
//     isGold: true,
//     name: "Nelson",
//     phone: +2349011093724,
//   });
//   const second = new Customers({
//     isGold: false,
//     name: "Chisom",
//     phone: +2349155751630,
//   });
//   const third = new Customers({
//     isGold: true,
//     name: "Yoda",
//     phone: +2349035252001,
//   });

//   first.save();
//   second.save();
//   third.save();
// }
// // createCustomer();

router.get("/", async (req, res) => {
  let customer = await Customers.find()
    .sort("name")
    .select({ name: 1, _id: 0 });

  try {
    res.send(customer);
  } catch (error) {
    res.status(404).send(error.details[0].message);
  }
});

router.get("/:id", async (req, res) => {
  //router.get() in place of app.get()

  let customer = await Customers.findById(req.params.id)
    .limit(1)
    .select({ name: 1, _id: 0 });
  try {
    res.send(customer);
  } catch (error) {
    res.status(404).send(error.details[0].message);
  }

  return;
});

router.post("/", async (req, res) => {
  const { error, value } = Validate(req.body);
  if (error) {
    return res.status(400).send(`a joi errror = ${error.details[0].message}`);
  } else {
    let newCustomer = new Customers({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });
    newCustomer
      .save()
      .then(() => {
        console.log("saved new customer");
      })
      .catch((err) => console.log(err));

    try {
      res.send(newCustomer);
    } catch (error) {
      console.log(error.details[0].message);
    }

    return;
  }
});

router.put("/:id", async (req, res) => {
  await Customers.findByIdAndUpdate(req.params.id, {
    $set: {
      name: "naija-jazz",
    },
  })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));
});

router.delete("/:id", async (req, res) => {
  Customers.findByIdAndDelete(req.params.id)
    .then(() => res.send("deleted sucessfully"))
    .catch((err) => res.send(err.message));
});


module.exports = router;
