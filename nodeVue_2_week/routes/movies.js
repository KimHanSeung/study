const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/list', (req, res) => {

    Movie.find().then((movies) => {
        if (!movies.length) return res.status(404).send({ err: 'Movies not found' });
        res.send(movies);
    }).catch(err => res.status(500).send(err));

});

router.get('/:id/detail', (req, res) => {

    //Movie.findOne 으로도 가능하다.
    Movie.find({"_id": req.params.id}).then((movie) => {
        if (!movie) return res.status(404).send({ err: 'Movie not found' });
        res.send(movie);
    }).catch(err => res.status(500).send(err));

});

router.post('/', (req, res) => {

    let movie = new Movie(req.body);
    movie.published_date = new Date();

    movie.save()
        .then(movie => res.send(movie))
        .catch(err => res.status(500).send(err));

});

router.put('/:id', (req, res) => {

    Movie.update({"_id":req.params.id}, {$set: req.body}, {upsert:true})
        .then(movie => res.send(movie))
        .catch(err => res.status(500).send(err));

});

router.delete('/:id', (req, res) => {

    Movie.remove({ _id: req.params.id })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});

module.exports = router;