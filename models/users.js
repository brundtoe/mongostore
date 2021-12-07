const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const usersCollection = 'users'
const findesUser = require('../lib/userExists')
const msg = require('../lib/messages')

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
        country: 1,
        mail: 1,
        _id: 1
      }
      const options = {
        sort: { id: -1 }
      }
      let col = db.collection(usersCollection)
      let cursor = await col.find(query, options).project(fields).toArray()
      return cursor ? { 'data': cursor } : msg.collection_not_found('Authors')
    } catch(err) {
      return msg.action_failed(err.message)
    }
  },

  async findById (user_id) {

    try {
      let db = await mongoCon.getConnection()
      const user = await db.collection(usersCollection).findOne({ id: user_id })
      return user ? {data: user} : msg.record_not_found(user_id, 'Customer')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async deleteById (user_id) {
    try {
      const orders = await findesUser.userHasOrders(user_id)
      if (orders) return msg.user_has_orders(user_id)

      const db = await mongoCon.getConnection()
      const result = await db.collection(usersCollection).findOneAndDelete({ id: user_id })
      return (result.ok === 1  && result.value) ? msg.record_deleted(user_id,'Customer') : msg.record_not_found(user_id, 'Customer')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async updateById (user) {

    try {
      const db = await mongoCon.getConnection()
      const result = await db.collection(usersCollection).findOneAndReplace({ id: user.id }, user
        , { returnDocument: 'after' })
      return (result.ok === 1 && result.value) ? msg.record_updated(user.id, 'customer') : msg.record_not_found(user.id, 'Customer')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async save (user) {
      try {
        const user_id = await getNextId('user_id')
        const db = await mongoCon.getConnection()
        user.id = user_id.value.next_value
        const result = await db.collection(usersCollection).insertOne(user)
        return (result.acknowledged) ? msg.record_created(user.id, 'customer') : msg.action_failed('Customer save')

    }
    catch (err) {
      return msg.action_failed(err.message)
    }
  }
}
