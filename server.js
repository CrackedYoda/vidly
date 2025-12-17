import express from 'express';
import connectdb from './db/connectdb.js';
const config = require("config");
const app = express();
import route from './routes/route.js';
const port = 3000;




connectdb();
console.log(app.get("env"))
console.log(process.env.NODE_ENV)
console.log(config.get("username.dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(route)



app.listen(port, () => {
    console.log('app running')
})