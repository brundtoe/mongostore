const createError = require('http-errors')
const orderlinesSchema = require('./orderlinesSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },

  put: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  delete: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },

}
