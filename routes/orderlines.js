const express = require('express')
const router = express.Router()
const validate = require('../middleware/orderlines/validate')
const orderlinesController = require('../middleware/orderlines')

router.route('/')
  .post(validate.post, orderlinesController.save)
  .put(validate.put, orderlinesController.update)

router.route('/:order_id/book/:book_id')
  .delete(validate.delete, orderlinesController.delete)

module.exports = router
