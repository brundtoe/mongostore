const express = require('express');
const router = express.Router();
const mongoCon = require('../dbs')
const assert = require('assert')
/* GET home page. */
router.get('/about', async function(req, res, next) {

  res.json({
    status: 'Success',
    mesage: 'Demo af anvendelse af mongodb',
    link: 'http://localhost:3000',
    users: 'http://localhost:3000/users'
  })

});

module.exports = router;
