const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/about', async function(req, res, next) {

  res.json({
    status: 'Success',
    mesage: 'Demo af anvendelse af mongodb',
    link: 'http://localhost:3300',
    users: 'http://localhost:3300/users'
  })

});

module.exports = router;
