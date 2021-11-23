const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const usersCollection = 'users'

module.exports = {
  async findAll () {

    try {
      let db = await mongoCon.getConnection()
      const query = {}
      const fields = {
        id: 1,
        name: 1,
        city: 1,
        state: 1,
        mail: 1,
        _id: 0
      }
      const options = {
        sort: { id: -1 },
        limit: 29
      }
      let col = db.collection(usersCollection)
      let cursor = await col.find(query, options).project(fields).toArray()
      return cursor ? { 'data': cursor } : {
        error: {
          type: 'RESOURCE_NOT_FOUND',
          description: 'Customers collection findes ikke',
        }
      }
    } catch(err) {
      return action_failed(err.message)
    }
  },

  async findById (user_id) {

    try {
      let db = await mongoCon.getConnection()
      const user = await db.collection(usersCollection).findOne({ id: user_id })
      return user ? {data: user} : user_not_found(user_id)

    } catch (err) {
      return action_failed(err.message)
    }
  },

  async deleteById (user_id) {
    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(usersCollection).findOneAndDelete({ id: user_id })
      return (result.ok === 1  && result.value) ? user_slettet(user_id) : user_not_found(user_id)
    } catch (err) {
      return action_failed(err.message)
    }
  },
  async updateById (user) {

    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(usersCollection).findOneAndReplace({ id: user.id }, user
        , { returnDocument: 'after' })
      return (result.ok === 1 && result.value) ? user_opdateret(user.id) : user_not_found(user.id)
    } catch (err) {
      return action_failed(err.message)
    }
  },

  async save (user) {
      try {
        const user_id = await getNextId('user_id')
        const db = await mongoCon.getConnection()
        user.id = user_id.value.next_value
        const result = await db.collection(usersCollection).insertOne(user)
        return (result.acknowledged) ? user_oprettet(user.id) : action_failed('User save')

    }
    catch (err) {
      return action_failed(err.message)
    }
  }
}

/**
 * Functions to return messages
 */
function user_not_found (user_id) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Customer ${user_id} findes ikke`,
    }
  }
}

function user_slettet (user_id) {
  return {
    data: {
      message: `Customer ${user_id} er slettet`,
      customer_id: user_id
    }
  }
}

function user_opdateret(user_id){
  return {
    data: {
      message: `Opdateret customer ${user_id}`,
      customer_id: user_id
    }
  }
}

function user_oprettet(user_id) {
  return {
    data:
      {
        message: `Oprettet customer ${user_id}`,
        customer_id: user_id
      }
  }
}

function action_failed(action) {
  return {
    error: {
      type: 'RESOURCE_NOT_FOUND',
      description: `Transaktionen ${action} fejlede`,
    }
  }
}
