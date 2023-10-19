const express = require("express");
const router = express.Router();

router.get('/', (req, res) => { // using router.get for all routes 
    res.send(genres)
});

module.exports = router;