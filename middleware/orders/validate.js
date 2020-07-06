const createError = require('http-errors')
const ordersSchema = require('./ordersSchema')
const Joi = require('@hapi/joi')

module.exports = {

  post: async (req, res, next) => {
    try {
      const schema = ordersSchema
        .with('orderdate',['user_id'])
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: async (req, res, next) => {

    try {
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  show: (req,res, next) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  delete: (req,res, next) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err) {
      next(createError(400, err))
    }
  }
}



