require('dotenv').config();
const chance = require('chance').Chance();
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');

const seed = async({ reviewers = 3, studios = 5, actors = 5, films = 10 } = {}) => {

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

  const createdActors = await Actor.create([...Array(actors)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.city()    
  })));

  const createdFilms = await Film.create([...Array(films)].map(() => ({
    title: chance.province(),
    studio: chance.pickone(createdStudios)._id,
    released: chance.year({ min: 1900, max: 2021 }),
    cast: [{
      role: `${chance.name()} the ${chance.profession()}`,
      actor: chance.pickone(createdActors)._id
    }]
  })));
};


module.exports = seed;
