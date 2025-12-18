import mongoose from "mongoose";


const rentalSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true, 
  },
  movie: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true},

  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },  
});





 const Rental = mongoose.model("rental",rentalSchema)



export default Rental;

