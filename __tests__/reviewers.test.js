const Reviewer = require('../lib/models/Reviewer');

const { prepare } = require('../data-helpers/data-helpers');
const  app = require('../lib/app');
const request = require('supertest');



describe('reviewers routes', () => {
    
  it('creates an reviewer via POST', async() => {
    return request(app)
      .post('/api/v1/reviewers/')
      .send({ name:'Bob', company: 'Bob\'s company' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.anything(), id: expect.anything(), name:'Bob', company: 'Bob\'s company', __v: 0 });
      });
  });
  
  
  it('gets all reviewers with GET', async() => {

    const reviewers = prepare(await Reviewer.find());

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('it gets a reviewer by id and other stuff', async() => {
    
    const reviewer = prepare(await Reviewer.findOne().populate({ 
      path: 'reviews',
      select: { rating: true, review: true, film: true }, 
      populate: { path: 'film', select: { title: true } }
    }));
    
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });

  it('updates a reviewer with PATCH', async() => {

    const reviewer = prepare(await Reviewer.findOne());

    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ company: 'new company' })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          name: reviewer.name,
          company: 'new company',
          _id: reviewer.id,
          id: expect.anything()
        });
      });
  });

  it('it deletes a reviewer by id if there are no reviews', async() => {
    
    const reviewer = prepare(await Reviewer.create({ name: 'reviwerName', company: 'reviewerCompany' }));

    return request(app)
      .delete(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual(reviewer);
      });
  });
});
