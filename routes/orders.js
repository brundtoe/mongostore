const express = require('express')
const router = express.Router()
const validate = require('../middleware/orders/validate')
const bookordersController = require('../middleware/orders')

router.route('/')
  .get(bookordersController.index)
  .post(validate.post, bookordersController.save)
  .put(validate.put, bookordersController.update)

router.route('/:id')
  .get(validate.show, bookordersController.show)
  .delete(validate.delete, bookordersController.delete)

module.exports = router
