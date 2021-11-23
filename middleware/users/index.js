const users = require('../../models/users')

module.exports = {

  async index (req, res, next) {

    try {
      const data = await users.findAll()
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },
  async show (req, res, next) {
    const user_id = parseInt(req.params.id)

    try {
      const data = await users.findById(user_id)
      const status = data['data'] ? 200 : 404
      res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async save (req, res, next) {
    const user = {
      id: null,
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      mail: req.body.mail
    }

  try {
    const data = await users.save(user)
    res.status(201).json(data)
    } catch (err) {
      next(err)
    }

  },
  async update (req, res, next) {

    const user_id = parseInt(req.body.id)

    const user = {
      id: user_id,
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      mail: req.body.mail
    }

  try {
    const data = await users.updateById(user)
    const status = data['data'] ? 200 : 404
    res.status(status).json(data)
    } catch (err) {
      next(err)
    }
  },

  async delete (req, res, next) {
    const user_id = parseInt(req.params.id)
    try {
      const data = await users.deleteById(user_id)
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
