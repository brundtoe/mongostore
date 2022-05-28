const createError = require('http-errors')
const orderlinesSchema = require('./orderlinesSchema')
const Joi = require('joi')
const {orderExists} = require('../../lib/orderExists')
module.exports = {
  post: async (req, res, next) => {
    try {
      const schema = orderlinesSchema
        .with('order_id',['book_id','numbooks'])
      Joi.assert(req.body,schema )
      const order = await orderExists(parseInt(req.body.order_id))
      if (!order) throw new Error(`Ordren med nummer ${req.body.order_id} findes ikke`)
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
      const order = await orderExists(parseInt(req.body.order_id))
      if (!order) throw new Error(`Ordren med nummer ${req.body.order_id} findes ikke`)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  delete: async (req,res, next) => {
    try {
      const schema = orderlinesSchema
        .with('order_id','book_id')
      Joi.assert(req.params,schema)
      const order = await orderExists(parseInt(req.params.order_id))
      if (!order) throw new Error(`Ordren med nummer ${req.params.order_id} findes ikke`)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  }

}
