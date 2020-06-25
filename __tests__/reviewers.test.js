const Reviewer = require('../lib/models/Reviewer');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');



describe('reviewers routes', () => {
    
  it('gets all reviewers with GET', async() => {

    const reviewers = prepare(await Reviewer.find());

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });
});
