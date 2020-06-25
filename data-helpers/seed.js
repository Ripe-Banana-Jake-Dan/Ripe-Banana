require('dotenv').config();
const chance = require('chance').Chance();
const Reviewer = require('../lib/models/Reviewer');

const seed = async({ reviewer = 3 } = {}) => {

    const reviewer = await Reviewer.create([...Array(reviewer)].map(() => ({
        name: chance.name(),
        company: chance.company()
    })))

}


module.exports = seed