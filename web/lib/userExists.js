const mongoCon = require('../dbs')
const createdError = require('http-errors')
const usersCollection = 'users'
const ordersCollection = 'bookorders'

async function userExists(user_id){
  try {
    const db = await mongoCon.getConnection()
    const user = await db.collection(usersCollection).findOne({id:user_id})
    return user !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}
async function userHasOrders(user_id){
  try {
    const db = await mongoCon.getConnection()
    const order = await db.collection(ordersCollection).findOne({id:user_id})
    return order !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {userExists, userHasOrders}
