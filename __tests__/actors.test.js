const Actor = require('../lib/models/Actor');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');

describe('actors routes', () => {

  it('creates an actor via POST', async() => {
    return request(app)
      .post('/api/v1/actors/')
      .send({ name:'Bob', dob: '1960-11-01T03:48:02.392Z', pob: 'whateverville' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.anything(), id: expect.anything(), name:'Bob', dob: '1960-11-01T03:48:02.392Z', pob: 'whateverville', __v: 0 });
      });
  });
  
  it('get all actors names by GET', async() => {
    const actors =  prepare(await Actor.find().select({ name: true }));

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });

  it('it gets actor by ID and the films they are in', async() => {
    
    const actor = prepare(await Actor.findOne().populate('films', { title: true, released: true }));
    
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });
});
