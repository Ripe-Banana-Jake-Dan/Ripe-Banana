const Film = require('../lib/models/Film');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');

describe('film route tests', () => {
    
  it('it gets all films with GET', async() => {

    const film = prepare(await Film
      .find()
      .select({ title: true, released: true })
      .populate('Studio', { name: true }));

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

});
