const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

},
{
  toJSON: {
    virtuals: true
  }
});

schema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'reviewer'
});


schema.statics.checkForReviews = async function(id) {
  const foundReviews = await this.model('Review')
    .find({ reviewer: id });

  if(foundReviews.length === 0) return this.findByIdAndDelete(id);
  else throw new Error('cannot delete reviewer if reviewer has reviews');
};

module.exports = mongoose.model('Reviewer', schema);

