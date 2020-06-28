const createError = require('http-errors')
const userSchema = require('../lib/userSchema')

module.exports = {
  post: (req, res, next) => {
      const valRes = userSchema.validate(req.body)
      if (valRes.error !== undefined) {
        next(createError(400,valRes.error.message))
      }
      next()
  }
}

//      const {error, value } = schema.validate({ username: 'abc', birth_year: 1994, password: 'secret', repeat_password: 'secret', email: 'jens@mail.com'})
