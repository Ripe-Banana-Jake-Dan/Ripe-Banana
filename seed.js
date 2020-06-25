require('dotenv').config();
require('./lib/utils/connect')();
const moongoose = require('mongoose');
const seed = require('./data-helpers/seed');
seed()
  .then(() => console.log('Done'))
  .catch(err => console.error(`Error: ${err}`))
  .finally(() => moongoose.connection.close());
