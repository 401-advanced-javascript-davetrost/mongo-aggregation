const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradeSchema = new Schema();

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
    _id: {
      type: '$scores.type',
      class_id: '$class_id'
    },
    avg: {
      $avg: '$scores.score'
    }
  }
};

const projectTypeAndClass = {
  $project: {
    type: '$_id.type',
    class_id: '$_id.class_id',
    avg: '$avg'
  }
};

gradeSchema.static('gradesByTypeAndClass', function() {
  const pipeline = [
    unwindScores, 
    removeNullScores,
    groupAndAverage,
    projectTypeAndClass
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Grade', gradeSchema, 'grades');