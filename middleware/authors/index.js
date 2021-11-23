const authors = require('../../models/authors')

module.exports = {
  async index (req, res, next) {

    try {
      const data = await authors.findAll()
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async show (req,res,next) {
    const author_id = parseInt(req.params.id)

    try {
      const data = await authors.findById(author_id)
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async save (req, res, next) {

    const author = {
      id: null,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail
    }
    try {
      const data = await authors.save(author)
      const status = data['data'] ? 201 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async update (req, res, next) {
    const author_id = parseInt(req.body.id)

    const author = {
      id: author_id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail
    }

    try {
      const data = await authors.updateById(author)
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }

  },

  async delete (req, res, next) {
    const author_id = parseInt(req.params.id)
    try {
      const data = await authors.deleteById(author_id)
      let status
      if (data.data) {
        status = 200
      }
      else {
        status = data.error.type === 'NOT_ALLOWED' ? 403 : 404
      }
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }

  }

}
