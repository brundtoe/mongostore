const mongoCon = require('../dbs')
const createdError = require('http-errors')
const authorCollection = 'authors'

async function authorExists(author_id){
  try {
    const db = mongoCon.getConnection()
    const author = await db.collection(authorCollection).findOne({id:author_id})
    return author !== null;
  } catch (err) {
    throw createdError(400,err)
  }
}

module.exports = {authorExists}
