const express = require('express')
const router = express.Router()
const validate = require('../middleware/authors/validate')
const authorsController = require('../middleware/authors')

router.route('/')
  .get(authorsController.index)
  .post(validate.post, authorsController.save)
  .put(validate.put, authorsController.update)

router.route('/:id')
  .get(validate.show, authorsController.show)
  .delete(validate.delete, authorsController.delete)

module.exports = router
