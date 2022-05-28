const findes = require('../userExists')

describe("Does user exists", () => {
  test('user number 3 exists', async () => {
    const user_id = 3
    const user = await findes.userExists(user_id)
    expect(user).toBeTrue()
  })
  test('user number 999 does not exists', async () => {
    const user_id = 999
    const user = await findes.userExists(user_id)
    expect(user).toBeFalse()
  })

})
