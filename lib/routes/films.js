const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .get('/', (req, res, next) => {
    Film
      .find()
      .select({ title: true, released: true })
      .populate('Studio', { name: true })
      .then(film => res.send(film))
      .catch(next);
  });
