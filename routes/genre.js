const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const {Genres, validate} = require("../models/genre")
const router = express.Router(); //initializing express.Router()

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log(" genre db running");
  })
  .catch((err) => console.log(err));


router.get("/", async (req, res) => {
  let genre = await Genres.find().sort("name").select({ name: 1, _id: 0 });
  try {
    res.send(genre);
  } catch (error) {
    res.status(404).send(error.details[0].message);
  }
});

router.get("/:id", async (req, res) => {
  //router.get() in place of app.get()

  let genre = await Genres.findById(req.params.id)
    .limit(1)
    .select({ name: 1, _id: 0 });
  try {
    res.send(genre);
  } catch (error) {
    res.status(404).send(error.details[0].message);
  }
});

router.post("/", async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) {
    return res.status(400).send(`a joi errror = ${error.details[0].message}`);
  } else {
   let newGenre =  new Genres({
      name: req.body.genre,
    });
      newGenre.save()
      .then(() => {
        console.log("saved new genere");
        res.send(newGenre);
      })
      .catch((err) => console.log(err));

    return;
  }
});

router.put("/:id", async (req, res) => {
  await Genres.findByIdAndUpdate(req.params.id, {
    $set: {
      name: "naija-jazz",
    },
  })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));

});

router.delete("/:id", async (req, res) => {
  Genres.findByIdAndDelete(parseInt(req.params.id))
    .then(() => res.send("deleted sucessfully"))
    .catch((err) => res.send(err.details[0].message));
});

module.exports = router;
