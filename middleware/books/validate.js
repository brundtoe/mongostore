const createError = require('http-errors')
const booksSchema = require('./booksSchema')
const {authorExists} = require('../../lib/authorExists')
const Joi = require('@hapi/joi')

module.exports = {
  post: async (req, res, next) => {
    try {
      const schema = booksSchema
        .with('title', ['author_id','bookprice','onhand'])
        .or('title','isbn','published')
      Joi.assert(req.body, schema)
      const author = await authorExists(parseInt(req.body.author_id))
      if (!author) throw createError(400,'author does not exist')
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: async (req, res, next) => {

    try {
      const schema = booksSchema
        .with('title',['_id','id','author_id','bookprice','onhand'])
        .or('title','isbn', 'published')
      Joi.assert(req.body,schema )
      const author = await authorExists(parseInt(req.body.author_id))
      if (!author) throw createError(400,'author does not exist')
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



