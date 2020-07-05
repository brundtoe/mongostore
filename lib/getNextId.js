const mongoCon = require('../dbs')

async function getNextId (counter) {
  let db = mongoCon.getConnection()
  return db.collection('counters').findOneAndUpdate({ _id: counter }, { $inc: { next_value: 1 } }, { returnOriginal: true })
}

module.exports = { getNextId }
