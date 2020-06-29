const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const conn = require('../dbs/mystore')
const assert = require('assert')

router.route('/')
  .get(async (req, res, next) => {
    try {
      const db = await conn()
      let r = await db.collection('testing').insertOne(
        {
          firstname: 'Katrine',
          lastname: 'Svendsen',
          email: 'katrine@mail.com',
          created_at: new Date(),
          updated_at: null
        }
      )
      assert(1, r.insertedCount)
      res.send('respond with a resource')
    } catch (err) {
      next(err)
    }

  })
  .post(validate.post, (req, res) => {
    res.status(201).json(req.body)
  })
  .put(validate.put, (req, res) => {
    res.status(201).json(req.body)
  })

module.exports = router
