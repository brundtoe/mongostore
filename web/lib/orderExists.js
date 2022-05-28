const mongoCon = require('../dbs')
const createdError = require('http-errors')
const orderCollection = 'bookorders'

async function orderExists(order_id){
  try {
    const db = await mongoCon.getConnection()
    const order = await db.collection(orderCollection).findOne({id:order_id})
    return order !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {orderExists}
