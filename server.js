const express = require('express');
const Joi = require('joi');
const config = require("config");
const app = express();
const genre = require('./routes/genre'); // importing the various endpoints
const home = require('./routes/home');
const port = 3000;
const logger = require('./middleware/logger');



console.log(app.get("env"))
console.log(config.get("username.dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api/genres',genre)   //using the routes
app.use('/',home)
app.use(logger);






app.listen(port, () => {
    console.log('app running')
})