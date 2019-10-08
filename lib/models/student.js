const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentschema = new Schema();

const unwindScores = {
  $unwind: {
    path: '$scores'
  }
};

const removeNullScores = {
  $match: {
    'scores.score': {
      $ne: null
    }
  }
};

const groupAndAverage = {
  $group: {
    _id: '$scores.type',
    avg: {
      $avg: '$scores.score'
    },
    min: {
      $min: '$scores.score'
    },
    max: {
      $max: '$scores.score'
    }
  }
};

studentschema.static('rollup', function() {
  const pipeline = [
    unwindScores, 
    removeNullScores,
    groupAndAverage
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Student', studentschema, 'students');