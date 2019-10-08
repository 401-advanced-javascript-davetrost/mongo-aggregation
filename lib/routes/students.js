const router = require('express').Router();
const Student = require('../models/student');

router
  .get('/', (req, res, next) => {
    Student.find()
      .lean()
      .then(students => res.json(students))
      .catch(next);
  })

  .get('/rollup', (req, res, next) => {
    Student.rollup()
      .then(scores => res.json(scores))
      .catch(next);
  })
  
; /*end of router*/


module.exports = router;