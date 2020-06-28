const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.route('/')
  .get((req, res) => {
    res.send('respond with a resource')
  })
  .post(validate.post, save)

function save(req,res) {
    res.status(201).json(req.body)
}

module.exports = router
