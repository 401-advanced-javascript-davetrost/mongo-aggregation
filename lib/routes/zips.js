const router = require('express').Router();
const Zip = require('../models/zip');

router
  .get('/', (req, res, next) => {
    Zip.find()
      .lean()
      .then(zips => res.json(zips))
      .catch(next);
  })

  .get('/populous', (req, res, next) => {
    const limit = parseInt(req.query.limit || 10);
    
    Zip.populous(limit)
      .then(zips => res.json(zips))
      .catch(next);
  })
  
; /*end of router*/


module.exports = router;