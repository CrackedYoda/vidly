const express = require("express");

const Joi = require("joi");
const {Genres, validate} = require("../models/genre")
const router = express.Router(); //initializing express.Router()



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
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");

  const { error, value } = validate(req.body);
  if (error) {
    return res.status(400).send(`a joi error = ${error.details[0].message}`);
  }

  genre.set({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  Genres.findByIdAndDelete(parseInt(req.params.id))
    .then(() => res.send("deleted sucessfully"))
    .catch((err) => res.send(err.details[0].message));
});

module.exports = router;
