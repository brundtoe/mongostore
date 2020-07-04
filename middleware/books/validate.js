const createError = require('http-errors')
const booksSchema = require('./booksSchema')
const Joi = require('@hapi/joi')

module.exports = {
  post: (req, res, next) => {

    try {
      const schema = booksSchema
        .with('title', ['author_id','bookprice','onhand'])
        .or('title','isbn','published')
      Joi.assert(req.body, schema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: (req, res, next) => {

    try {
      const schema = booksSchema
        .with('title',['_id','id','author_id','bookprice','onhand'])
        .or('title','isbn', 'published')
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



