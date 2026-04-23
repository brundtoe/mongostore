const mongoCon = require('../dbs')
const { getNextId } = require('../lib/getNextId')
const usersCollection = 'users'
const findesUser = require('../lib/userExists')
const msg = require('../lib/messages')
const { DateTime } = require('luxon')

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
        _id: 1,
        created_at: 1,
        updated_at: 1
      }
      const options = {
        sort: { id: -1 }
      }
      let col = db.collection(usersCollection)
      let cursor = await col.find(query, options).project(fields).toArray()
      return cursor ? { 'data': cursor } : msg.collection_not_found('Authors')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async findById (user_id) {

    try {
      let db = await mongoCon.getConnection()
      const user = await db.collection(usersCollection).findOne({ id: user_id })

      if (user) {
        user.created_at = DateTime.fromJSDate(user.created_at)
          .setZone('Europe/Copenhagen')
          .toFormat('yyyy-MM-dd HH:mm:ss')
        if (user.updated_at) {
          user.updated_at = DateTime.fromJSDate(user.updated_at)
            .setZone('Europe/Copenhagen')
            .toFormat('yyyy-MM-dd HH:mm:ss')
        } else {
          user.updated_at = ''
        }
      }

      return user ? { data: user } : msg.record_not_found(user_id, 'Customer')

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
      return result ? msg.record_deleted(user_id, 'Customer') : msg.record_not_found(user_id, 'Customer')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },
  async updateById (user) {
    user.updated_at = DateTime.now().setZone('Europe/Copenhagen')

    try {
      const userOld = await findesUser.userExists(user.id)
      if (!userOld) return msg.record_not_found(user.id, 'Customer')
      user.created_at = userOld.created_at

      const db = await mongoCon.getConnection()
      const result = await db.collection(usersCollection).findOneAndReplace({ id: user.id }, user
        , { returnDocument: 'after' })
      return result ? msg.record_updated(user.id, 'customer') : msg.record_not_found(user.id, 'Customer')
    } catch (err) {
      return msg.action_failed(err.message)
    }
  },

  async save (user) {
    const createdAt = DateTime.fromFormat(process.env.CREATED_AT,'yyyy-MM-dd HH:mm:ss') || DateTime.now().setZone('Europe/Copenhagen')
    user.created_at = createdAt
    try {
      const user_id = await getNextId('user_id')
      const db = await mongoCon.getConnection()
      user.id = user_id.next_value
      const result = await db.collection(usersCollection).insertOne(user)
      return (result.acknowledged) ? msg.record_created(user.id, 'customer') : msg.action_failed('Customer save')

    } catch (err) {
      return msg.action_failed(err.message)
    }
  }
}
