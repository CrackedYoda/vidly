import express from "express";
import { validateRentalMiddleware } from "../middleware/validationFactory.js";
import addRental from "../controllers/rentalsController.js";
import Rental from "../models/rentals.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.send(rentals);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", validateRentalMiddleware, addRental);

export default router;
