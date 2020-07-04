const mongoCon = require('../../dbs')
const assert = require('assert')
const createError = require('http-errors')
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
      res.status(200).json({data: cursor})
    } catch (err) {
      next(err)
    }
  },
  async show (req, res, next) {
    let db = mongoCon.getConnection()
    const id = parseInt(req.params.id)
    try {
      const user = await db.collection(userCollection).findOne({id:id})
      res.status(200).json({data: user})
    } catch (err){
      next(err)
    }
  },

  async save (req, res, next) {
    res.status(201).json({data: req.body })
  },
  async update (req, res, next) {
    res.status(201).json({data: req.body })
  },
  async delete (req, res, next) {
    res.status(200).json({success: 'users delete function'})
  }

}
