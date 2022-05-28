const express = require('express')
const router = express.Router()
const validate = require('../middleware/books/validate')
const booksController = require('../middleware/books')

router.route('/')
  .get(booksController.index)
  .post(validate.post, booksController.save)
  .put(validate.put, booksController.update)

router.route('/:id')
  .get(validate.show, booksController.show)
  .delete(validate.delete, booksController.delete)

module.exports = router
