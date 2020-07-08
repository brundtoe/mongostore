const mongoCon = require('../dbs')
const createdError = require('http-errors')
const userCollection = 'users'

async function userExists(user_id){
  try {
    const db = await mongoCon.getConnection()
    const user = await db.collection(userCollection).findOne({id:user_id})
    return user !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {userExists}
