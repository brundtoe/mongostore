const express = require('express')
const router = express.Router()
//const validate = require('../middleware/validate')
const booksController = require('../middleware/books')

router.route('/')
  .get(booksController.index)
  .post(booksController.save)
  .put(booksController.update)

router.route('/:id')
  .get(booksController.show)
  .delete(booksController.delete)

module.exports = router
