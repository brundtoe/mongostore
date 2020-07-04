const createError = require('http-errors')
const authorsSchema = require('./authorsSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: (req, res, next) => {

    try {
      const schema = authorsSchema
        .with('firstname', ['lastname','mail'])
      Joi.assert(req.body, schema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: (req, res, next) => {

    try {
      const schema = authorsSchema
        .with('_id',['id','firstname','lastname','mail'])
      Joi.assert(req.body,schema )
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

