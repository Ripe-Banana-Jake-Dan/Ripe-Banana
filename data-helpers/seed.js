require('dotenv').config();
const chance = require('chance').Chance();
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');

const seed = async({ reviewers = 3, studios = 5 } = {}) => {

  const createdReviewers = await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const createdStudios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

};


module.exports = seed;
