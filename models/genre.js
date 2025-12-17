
const mongoose = require("mongoose");

  const genreSchema = new mongoose.Schema({
   
    name: {
      type: String,
      required: true,
    },
  });
  


  export default genreSchema;  export const Genres = mongoose.model("genre", genreSchema);                          