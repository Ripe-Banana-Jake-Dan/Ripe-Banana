const { Router } = require('express');
const Actor = require('../models/Actor');

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
      .populate('Film', { title: true, released: true })
      .then(actor => res.send(actor))
      .catch(next);
  });
