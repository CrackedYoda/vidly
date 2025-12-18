import Movies from "../models/movies.js";

export const addMovie = async (req, res) => {
  try {
    const existingMovie = await Movies.findOne({
      title: req.validatedData.title,
    });
    
    if (existingMovie) {
      return res.status(400).send("Movie with this title already exists");
    }
    const validGenres = Movies.schema.path('genre').enumValues;
    
    if (!validGenres.includes(req.validatedData.genre)) {
      return res.status(400).send(`Invalid genre. Must be one of: ${validGenres.join(', ')}`);
    }
    const newMovie = new Movies({
      title: req.validatedData.title,
      genre: req.validatedData.genre,
      numberInStock: req.validatedData.numberInStock,
      dailyRentalRate: req.validatedData.dailyRentalRate,
      owner: req.validatedData.owner
    });

    await newMovie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find().populate('owner', 'userName userEmail');
    res.send(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    
    res.send(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.validatedData.title,
          genre: req.validatedData.genre,
          numberInStock: req.validatedData.numberInStock,
          dailyRentalRate: req.validatedData.dailyRentalRate,
        }
      },
      { new: true }
    );

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.send(movie);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movies.findByIdAndDelete(req.params.id);
    
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.send("Movie deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};