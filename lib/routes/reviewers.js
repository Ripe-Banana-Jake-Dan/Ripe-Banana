const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({ 
        path: 'reviews',
        select: { rating: true, review: true, film: true }, 
        populate: { path: 'film', select: { title: true } }
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
