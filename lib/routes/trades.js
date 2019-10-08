const router = require('express').Router();
const Trade = require('../models/trade');

router
  .get('/', (req, res, next) => {
    Trade.find()
      .lean()
      .limit(100)
      .then(trades => res.json(trades))
      .catch(next);
  })

  .get('/most_active_hours', (req, res, next) => {
    const limit = parseInt(req.query.limit || 10);
    const symbol = req.query.symbol;

    Trade.mostActiveHours(symbol, limit)
      .then(periods => res.json(periods))
      .catch(next);
  })
  
  .get('/least_active_hours', (req, res, next) => {
    const limit = parseInt(req.query.limit || 10);
    const symbol = req.query.symbol;

    Trade.leastActiveHours(symbol, limit)
      .then(periods => res.json(periods))
      .catch(next);
  })
  
; /*end of router*/


module.exports = router;