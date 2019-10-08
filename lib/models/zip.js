const mongoose = require('mongoose');
const { Schema } = mongoose;

const zipSchema = new Schema();

const mostPopulous = ({
  '$sort': {
    'pop': -1
  }
});

const limitToTop = limit => ({
  $limit: limit
});

zipSchema.static('populous', function(limit) {
  const pipeline = [
    mostPopulous, 
    limitToTop(limit)
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Zip', zipSchema, 'zips');