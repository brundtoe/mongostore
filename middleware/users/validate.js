const createError = require('http-errors')
const userSchema = require('../../lib/userSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: (req, res, next) => {

    try {
      const schema = userSchema
        .with('name', ['mail','city'])
        .or('name','country')
        .or('name','state')
      Joi.assert(req.body, schema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: (req, res, next) => {

    try {
      const schema = userSchema
        .with('_id',['id','name','mail','city'])
        .or('name','country')
        .or('name','state')
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },

}

