const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { User, validateUser } = require("../models/user");
const router = express.Router();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("user db running");
  })
  .catch((err) => console.log(err));

router.post("/", async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).send(`a joi errror = ${error.details[0].message}`);
  } else {
    let user = await User.findOne({ email: req.body.userEmail });
    if (user) {
      res.send("user already exist");
    } else {
      const newUser = new User({
        name: req.body.userName,
        email: req.body.userEmail,
        passsword: req.body.userPassword,
      });

      newUser
        .save()
        .then(() => {
          res.send(newUser);
        })
        .catch((error) => console.log(error));
    }
  }
});

module.exports = router;
