const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');


const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');

describe('film route tests', () => {
 
  it('creates an film via POST', async() => {
    const studio = prepare(await Studio.findOne());
    return request(app)
      .post('/api/v1/films/')
      .send({ title:'Bob\'s Film', studio: studio._id, released: 1994 })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.anything(), id: expect.anything(), cast: [], title:'Bob\'s Film', studio: studio._id, released: 1994, __v: 0 });
      });
  });

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
        path: 'reviews',
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
