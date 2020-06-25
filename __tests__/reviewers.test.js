const Reviewer = require('../lib/models/Reviewer');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');



describe('reviewers routes', () => {
    
  it('gets all reviewers with GET', async() => {

    const reviewer = prepare(await Reviewer.findOne());

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual([{ '__v': 0, '_id': expect.anything(),
          'company': expect.any(String), 'name': expect.any(String) }, 
        { '__v': 0, '_id': expect.anything(), 
          'company': expect.any(String), 'name': expect.any(String) }, 
        { '__v': 0, '_id': expect.anything(),
          'company': expect.any(String), 
          'name': expect.any(String) }]);
      });
   
  });
});
