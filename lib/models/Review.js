const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },

  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',   
  },

  review: { 
    type: String,
    maxlength: 140, 
    required: true 
  },

  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  }
}
, {
  toJSON: {
    virtuals: true
  }
});

schema.statics.top100Rated = function() {
  return this.aggregate([
    {
      '$sort': {
        'rating': -1
      }
    }, {
      '$limit': 100
    }
  ]);
};

module.exports = mongoose.model('Review', schema);
