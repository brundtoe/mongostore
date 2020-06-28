const createError = require('http-errors')
const userSchema = require('../lib/userSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: (req, res, next) => {

    try {
      const schema = userSchema
        .with('username', 'birth_year')
        .xor('password', 'access_token')
        .with('password', 'repeat_password')
      Joi.assert(req.body, schema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: (req, res, next) => {

    try {
      Joi.assert(req.body, userSchema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },

}

//      const {error, value } = schema.validate({ username: 'abc', birth_year: 1994, password: 'secret', repeat_password: 'secret', email: 'jens@mail.com'})
