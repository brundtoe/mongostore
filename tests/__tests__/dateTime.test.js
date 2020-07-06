const ObjectID = require('mongodb').ObjectID

describe('demo tests', () => {

  test('get timestamp', () => {
    //date when the test is run
    const nutid = new ObjectID()
    const userEpoc = Date.parse(nutid.getTimestamp())

    //historical _id fra 2006
    const userId = '44d601309a7364461404ece0'
    const created = parseInt(userId.substring(0, 8), 16)
    const oldEpoc = created * 1000
    const oldDate = new Date(oldEpoc)
    // Sun, 06 Aug 2006 14:48:16 GMT
    const utc = oldDate.toUTCString()
    expect(utc).toBe('Sun, 06 Aug 2006 14:48:16 GMT')
    expect(userEpoc).toBeGreaterThan(oldEpoc)
    expect(oldDate.getFullYear()).toBe(2006)
    expect(nutid.getTimestamp().getFullYear()).toBeGreaterThan(oldDate.getFullYear())
  })
})
