const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const usersController = require('../middleware/users')

router.route('/')
  .get(usersController.index)
  .post(validate.post, usersController.save)
  .put(validate.put, usersController.update)

router.route('/:id')
  .delete(usersController.delete)

module.exports = router
