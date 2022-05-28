const mongoCon = require('../dbs')

async function getNextId (counter) {
  let db = await mongoCon.getConnection()
  return db.collection('counters').findOneAndUpdate({ _id: counter }, { $inc: { next_value: 1 } }, { returnDocument: 'before' })
}

module.exports = { getNextId }
