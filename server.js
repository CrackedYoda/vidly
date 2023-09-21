const express = require('express');
const Joi = require('joi');
const { json } = require('stream/consumers');
const validation = require('./validation');
const validate = validation.validate
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true}))

let genres = [
    { id: 1, name: 'hip-hop' },
    { id: 2, name: 'afro' },
    { id: 3, name: 'jazz' },
    { id: 4, name: 'afrobeat' },
    { id: 5, name: 'afro depression' }

]

app.get('/', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    let genre = genres.find((item) => {
        if (item.id === parseInt(req.params.id)) {
            return item;
        }
    })

    if (!genre) {
        return res.status(404).send('not found');

    }
    else {
        return res.send(genre.name);
    }
})


app.post('/api/genres', (req, res) => {


    const { error, value } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);

    }
    else {
        const genre = {
            id: genres.length + 1,
            genre: req.body.genre
        }
        genres.push(genre);
        res.send(genre);
        return;
    }
})
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find((item) => { if (item.id === parseInt(req.params.id)) { return item; } })

    const { error, value } = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);

    }
    else {
        genre.name = req.body.genre;
        return res.send(genres);
    }
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find((item) => { if (item.id === parseInt(req.params.id)) { return item; } })

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    return res.send(genres);
})

function validate(item) {

    const genrenameschema = Joi.object({  // TO use joi validation you first create the validation schema 
        genre: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required()
    })

    return genrenameschema.validate(item);

}
app.listen(port, () => {
    console.log('app running')
})