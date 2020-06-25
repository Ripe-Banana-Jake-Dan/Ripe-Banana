const Actor = require('../lib/models/Actor');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');

describe('actors routes', () => {

  it('get all actors names by GET', async() => {
    const actors =  prepare(await Actor.find().select({ name: true }));

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});
