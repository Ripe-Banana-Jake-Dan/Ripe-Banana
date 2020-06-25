const Reviewer = require('../models/Reviewer');
module.exports = (req, res, next) => {
  const token = req.cookies.whatever;
  //reads cookies
  const reviewer = Reviewer.verifyToken(token);
  //verifies cookie with reviewer
  req.reviewer = reviewer;
  next();
};
