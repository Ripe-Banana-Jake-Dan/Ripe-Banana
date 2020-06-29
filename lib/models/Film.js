const mongoose = require('mongoose');


const schema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },

  released: {
    type: Number,
    required: true,
    minlength: 4,
    maxlength: 4
  },

  cast: [{
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

schema.virtual('review', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film'
});

module.exports = mongoose.model('Film', schema);
