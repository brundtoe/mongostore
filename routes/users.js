const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const mongoCon = require('../dbs')
const assert = require('assert')
const userCollection = 'users'

router.route('/')
  .get(async (req, res, next) => {

    try {
      let db = mongoCon.getConnection()
      query = {
        state: { $in: ['Indiana','California']}
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

  })
  .post(validate.post, async (req, res, next) => {
    res.status(201).json(req.body)
  })
  .put(validate.put, (req, res) => {
    res.status(201).json(req.body)
  })

module.exports = router
