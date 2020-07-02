const express = require('express')
const router = express.Router()
//const validate = require('../middleware/validate')
const authorsController = require('../middleware/authors')

router.route('/')
  .get(authorsController.index)
  .post(authorsController.save)
  .put(authorsController.update)

router.route('/:id')
  .delete(authorsController.delete)

module.exports = router
