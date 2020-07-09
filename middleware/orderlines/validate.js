const createError = require('http-errors')
const orderlinesSchema = require('./orderlinesSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
        .with('order_id',['book_id','numbooks'])
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },

  put: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
        .with('order_id',['book_id','numbooks'])
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  delete: (req,res, next) => {
    try {
      const schema = orderlinesSchema
      Joi.assert(req.params,schema)
        .with('order_id','book_id')
      next()
    } catch (err) {
      next(createError(400, err))
    }
  }

}
