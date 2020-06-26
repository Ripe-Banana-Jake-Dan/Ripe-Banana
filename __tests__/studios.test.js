const Studio = require('../lib/models/Studio');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');

describe('studios routes', () => {

  it('get all studios with GET', async() => {
    const studios = prepare(await (await Studio.find().select({ name: true })));

    return request(app)
      .get('/api/v1/studios')
      .then (res => {
        expect(res.body).toEqual(studios);
      });

  });

  it('it gets a studio by id and all films from that studio', async() => {
    
    const studio = prepare(await Studio.findOne().populate('Film', { title: true, studio: true }));

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
});
