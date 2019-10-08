const router = require('express').Router();
const Book = require('../models/book');

router
  .get('/', (req, res, next) => {
    Book.find()
      .lean()
      .then(books => res.json(books))
      .catch(next);
  })

  .get('/page_counts_by_author', (req, res, next) => {
    Book.pageCountsByAuthor()
      .then(scores => res.json(scores))
      .catch(next);
  })
  
; /*end of router*/


module.exports = router;