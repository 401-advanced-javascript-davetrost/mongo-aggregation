const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema();

const unwindAuthors = {
  $unwind: {
    path: '$authors'
  }
};

const groupAndAverage = {
  $group: {
    _id: '$authors',
    avgPageCount: {
      $avg: '$pageCount'
    }
  }
};

bookSchema.static('pageCountsByAuthor', function() {
  const pipeline = [
    unwindAuthors, 
    groupAndAverage
  ];

  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Book', bookSchema, 'books');