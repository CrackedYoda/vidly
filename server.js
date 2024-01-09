const express = require('express');
const Joi = require('joi');
// const mongoose = require('mongoose');
const config = require("config");
const app = express();
const genre = require('./routes/genre'); // importing the various endpoints
const home = require('./routes/home');
const customer = require('./routes/customer')
const port = 3000;
const logger = require('./middleware/logger');
const  movies = require('./routes/movies');
const rentals =  require('./routes/rentals');
const User = require('./routes/user');



console.log(app.get("env"))
console.log(config.get("username.dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/genres',genre)   //using the routes
app.use('/api/customer',customer) 
app.use('/',home)
app.use('/api/movies',movies)
app.use(logger)
app.use('/api/rentals', rentals)
app.use('/api/user',User)




app.listen(port, () => {
    console.log('app running')
})