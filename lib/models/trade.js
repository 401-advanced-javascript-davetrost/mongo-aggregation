const mongoose = require('mongoose');
const { Schema } = mongoose;
const { limitToTop } = require('./generic-aggregations');

const tradeSchema = new Schema();

const matchSymbol = symbol => ({
  $match: { symbol }
});

const projectByHour = {
  $project: {
    _id: '$_id',
    hour: { $minute: '$time' },
    ticker: '$ticker'
  }
};

const groupOrdersByHour = {
  $group: {
    _id: '$hour',
    hour: {
      $first: '$hour'
    },
    orderCount: { 
      $sum: 1 
    }
  }
};

const sort = (direction) => ({
  $sort: {
    orderCount: direction
  }
});

const extremeActiveHoursPipeline = (extreme, symbol, limit) => {
  const direction = (extreme === 'most') ? -1 : 1;
  const pipeline = [
    projectByHour,
    groupOrdersByHour,
    sort(direction),
    limitToTop(limit)
  ];
  
  if(symbol) pipeline.unshift(matchSymbol(symbol));

  return pipeline;
};

tradeSchema.static('mostActiveHours', function(symbol, limit) {
  return this.aggregate(extremeActiveHoursPipeline('most', symbol, limit));
});

tradeSchema.static('leastActiveHours', function(symbol, limit) {
  return this.aggregate(extremeActiveHoursPipeline('least', symbol, limit));
});

module.exports = mongoose.model('Trade', tradeSchema, 'trades');