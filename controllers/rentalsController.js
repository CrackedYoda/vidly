import Movies from "../models/movies.js";
import Customers from "../models/customer.js";
import Rental from "../models/rentals.js";

const addRental = async (req, res) => {
  try {
    const movie = await Movies.findById(req.validatedData.movieid); //validated data from joi middleware
    if (!movie) {
      return res.status(404).send("Movie not found"); // check to make sure movie exists
    }

    const customer = await Customers.findById(req.validatedData.customerid);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    if (movie.numberInStock === 0) {
      return res.status(400).send("Movie not available for rent");
    }
    const { dateOut, dateReturned, rentalFee } = req.validatedData;
    const newRental = await Rental.create({
      movie: movie._id,
      customer: customer._id,
      dateOut,
      dateReturned,
      rentalFee: movie.dailyRentalRate,
    });

    // Decrease stock after rental is saved
    movie.numberInStock--;
    await movie.save();

    res.send(newRental);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addRental;
