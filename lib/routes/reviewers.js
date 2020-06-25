const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
