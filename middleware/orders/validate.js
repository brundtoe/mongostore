const createError = require('http-errors')
const ordersSchema = require('./ordersSchema')
const Joi = require('@hapi/joi')
const { userExists } = require('../../lib/userExists')
module.exports = {

  post: async (req, res, next) => {
    try {
      const schema = ordersSchema
        .with('orderdate',['user_id','paymethod','shipby','lines'])
      Joi.assert(req.body,schema )
      const user = await userExists(req.body.user_id)
      if (!user) throw createError(400,'user does not exist')
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: async (req, res, next) => {

    try {
      const schema = ordersSchema
        .with('orderdate',['_id','id','user_id','paymethod','shipby','lines'])
      Joi.assert(req.body,schema )
      const user = await userExists(req.body.user_id)
      if (!user) throw createError(400,'user does not exist')
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



