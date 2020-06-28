const createError = require('http-errors')
const userSchema = require('../lib/userSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: (req, res, next) => {

    try {
      Joi.assert(req.body,userSchema)
      next()
    } catch (err) {
      next(createError(400,err))
    }
  }
}

//      const {error, value } = schema.validate({ username: 'abc', birth_year: 1994, password: 'secret', repeat_password: 'secret', email: 'jens@mail.com'})
