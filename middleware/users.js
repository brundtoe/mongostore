const mongoCon = require('../dbs')
const assert = require('assert')
const userCollection = 'users'

module.exports = {

  async index (req, res, next) {

    try {
      let db = mongoCon.getConnection()
      query = {
        state: { $in: ['Indiana', 'California'] }
      }
      fields = {
        id: 1,
        name: 1,
        city: 1,
        state: 1,
        mail: 1,
        _id: 0
      }
      options = {
        sort: { id: -1 },
        limit: 6
      }
      let col = db.collection(userCollection)
      let cursor = await col.find(query, options).project(fields).toArray()
      res.status(200).json(cursor)
    } catch (err) {
      next(err)
    }
  },
  async save (req, res, next) {
    res.status(201).json(req.body)
  },
  async update (req, res, next) {
    res.status(201).json(req.body)
  }
}
