import { Router } from "express";
import { addMovie, getMovies } from "../controllers/moviesController.js";
import { validateMovieMiddleware } from "../middleware/validationFactory.js";
const router = Router();

router.post("/newmovie", validateMovieMiddleware, addMovie);

router.get("/", getMovies);

export default router;
