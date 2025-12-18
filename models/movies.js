import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    minLength: 1,
    maxLength: 255,
  },
  genre: {
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Documentary', 'Thriller', 'Animation', 'Fantasy'], 
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  } 
});

const Movies = mongoose.model("movie", moviesSchema);

export default Movies;
