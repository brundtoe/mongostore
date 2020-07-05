const mongoCon = require('../../dbs')
const createError = require('http-errors')
const {getNextId} = require('../../lib/getNextId')
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
      res.status(200).json({ data: cursor })
    } catch (err) {
      next(err)
    }
  },
  async show (req, res, next) {
    let db = mongoCon.getConnection()
    const id = parseInt(req.params.id)
    try {
      const user = await db.collection(userCollection).findOne({ id: id })
      res.status(200).json({ data: user })
    } catch (err) {
      next(err)
    }
  },

  async save (req, res, next) {
    try {
      const user_id = await getNextId('user_id')
      const db = mongoCon.getConnection()
      req.body.id = user_id.value.next_value
      const result = await db.collection(userCollection).insertOne(req.body)
      res.status(201).json({
        data: {
          insertedCount: result.insertedCount,
          insertedId: result.insertedId,
          user: result.ops[0]
        }
      })
    } catch (err) {
      next(createError(400, err.message))
    }

  },
  async update (req, res, next) {
    const user_id = parseInt(req.body.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(userCollection).findOneAndReplace({ id: user_id },
        {
          id: user_id,
          name: req.body.name,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          mail: req.body.mail
        },{returnOriginal:false})
      res.status(201).json(result)
    } catch (err) {
      next(createError(400, err.message))
    }
  },
  async delete (req, res, next) {
    const user_id = parseInt(req.params.id)
    try {
      const db = mongoCon.getConnection()
      const result = await db.collection(userCollection).findOneAndDelete({ id: user_id })
      res.status(200).json({ data: result })
    } catch (err) {
      next(createError(400, err.message))
    }

  }

}
