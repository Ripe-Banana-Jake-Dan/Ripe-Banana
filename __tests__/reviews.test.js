const Review = require('../lib/models/Review');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');

describe('review route tests', () => {
    
  it('creates an reviews via POST', async() => {
    const reviewer = prepare(await Reviewer.findOne());
    const film = prepare(await Film.findOne());
    return request(app)
      .post('/api/v1/reviews/')
      .send({ rating: 1, reviewer: reviewer._id, review: 'This sucked', film: film._id  })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.anything(), id: expect.anything(), rating: 1, reviewer: reviewer._id, review: 'This sucked', film: film._id, __v: 0 });
      });
  });
  
  
  
  it('it gets the top 100 highest rated reviews', () => {
        
    

  });

  
});
