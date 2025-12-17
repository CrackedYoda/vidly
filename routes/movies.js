
const express = require("express");
const router = express.Router();
const { Movies, Validate } = require("../models/movies");
const { Genres } = require("../models/genre");



router.post("/newmovie", async (req, res) => {
  const { error, value } = Validate(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    let newMovie = new Movies({
      title: req.body.title,
      genre: new Genres({ name: req.body.genre }),
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    newMovie
      .save()
      .then(() => res.send(newMovie))
      .catch((err) => console.log(err));
    return;
  
  }
});

router.get("/", async (req, res) => {
  let movie = await Movies.find().select({ genre: 1, _id: 0 });
  if (!movie) {
    console.log("no movie found");
  } else {
    res.send(movie);
  }
});
module.exports = router;
