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

  it('it gets a film by ID with GET', async() => {

    const film = prepare(await Film
      .findOne()
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .populate({
        path: 'review',
        select: { rating: true, review: true },
        populate: { path: 'reviewer', select: { name: true } }
      })
    );
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual(film);
      });
  });

});
