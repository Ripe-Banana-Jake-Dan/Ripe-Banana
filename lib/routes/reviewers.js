const { Router } = require('express');
const Reviewer = require('../models/Reviewer');
const { findByIdAndDelete } = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })   
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
  })
  .patch('/:id', (req, res, next) =>{
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    if(!Reviewer.reviews){
      Reviewer
        .findByIdAndDelete(req.params.id)
        .then(reviewer => res.send(reviewer))
        .catch(next);
    }
    else (next); 
  });
