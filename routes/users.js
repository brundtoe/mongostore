const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const mongoCon = require('../dbs')
const assert = require('assert')

router.route('/')
  .get(async (req, res, next) => {

    try {
      let db = mongoCon.getConnection()
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
      res.send('startpage');
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
