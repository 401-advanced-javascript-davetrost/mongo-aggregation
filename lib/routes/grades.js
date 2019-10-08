const router = require('express').Router();
const Grade = require('../models/grade');

router
  .get('/', (req, res, next) => {
    Grade.find()
      .lean()
      .then(grades => res.json(grades))
      .catch(next);
  })

  .get('/by_type_and_class', (req, res, next) => {
    Grade.gradesByTypeAndClass()
      .then(scores => res.json(scores))
      .catch(next);
  })
  
; /*end of router*/


module.exports = router;