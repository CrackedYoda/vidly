import {Router} from "express";
import customer from "./customer.js";
import genre from "./genre.js";
import home from "./home.js";
import movies from "./movies.js";
import rentals from "./rentals.js";
import user from "./user.js";

const app = Router(); //initializing express.Router()


route.use('/api/genres',genre)   //using the routes
route.use('/api/customer',customer) 
route.use('/',home)
route.use('/api/movies',movies)
route.use(logger)
route.use('/api/rentals', rentals)
route.use('/api/user',user)

export default route;