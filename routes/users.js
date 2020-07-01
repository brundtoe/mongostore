const express = require('express')
const router = express.Router()
const usersController = require('../middleware/users')
const validate = require('../middleware/users/validate')

router.route('/')
  .get(usersController.index)
  .post(validate.post, usersController.save)
  .put(validate.put, usersController.update)

router.route('/:id')
  .delete(usersController.delete)

module.exports = router
