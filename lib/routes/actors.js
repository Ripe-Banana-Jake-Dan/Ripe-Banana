const { Router } = require('express');
const Actor = require('../models/Actor');
const films = require('./films');

module.exports = Router()
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ name: true })
      .then(actor => res.send(actor))
      .catch(next); 
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', { title: true, released: true })
      .then(actor => actor.films.map(film => {
        return {
          title: film.title,
          released: film.released
        };
      }))
      .then(actor => res.send(actor))
      .catch(next);
  });
