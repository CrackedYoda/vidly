import {Router} from "express";
import customer from "./customer.js";
import home from "./home.js";
import movies from "./movies.js";
import rentals from "./rentals.js";
import user from "./user.js";

const router = Router(); //initializing express.Router()


//using the routes
router.use('/api/customer',customer) 
router.use('/',home)
router.use('/api/movies',movies)
router.use('/api/rentals', rentals)
router.use('/api/user',user)

export default router;