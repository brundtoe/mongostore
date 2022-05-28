const request = require('supertest')

const app = require('../../app')

describe('Supertest af customer routes med supertest', () => {

  const validation_error = {
    type: 'VALIDATION_ERROR',
    description: ['Customer Id skal være numerisk'],
  }

  it('should succeed getting bookstore customers', async () => {
    return await request(app)
      .get('/api/customers')
      .set('Accept', 'application/json')
      .expect(200)
  })

  it('should succeed in getting customer 1', async () => {
    const id = 29
    return await request(app)
      .get(`/api/customers/${id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(res => {
        expect(res.body.data).toBeObject()
        expect(res.body.data).toEqual(expect.objectContaining({
          'id': 29,
          'name': 'christina masterson',
          'city': 'petersburgh',
          'state': 'pensylvania',
          'country': 'USA',
          'mail': 'christina@masterson.nu'
        }))
      })
  })

  it('should fail to get non existing customer', async () => {
    const id = 999
    return await request(app)
      .get(`/api/customers/${id}`)
      .set('Accept', 'application/json')
      .expect(404)
      .then(res => {
        expect(res.body.error).toBeObject()
        expect(res.body.error).toEqual(expect.objectContaining({
          type: 'RESOURCE_NOT_FOUND',
          description: `Customer ${id} findes ikke`,
        }))
      })
  })

  it('should fail to get non numeric customer', async () => {
    return await request(app)
      .get('/api/customers/9w99')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .then(res => {
        expect(res.body.error).toBeObject()
        expect(res.body.error).toEqual(expect.objectContaining(validation_error))
      })
  })

describe('Supertest Updates', function () {

  it('should succeed getting bookstore customers', async function () {
    return await request(app)
      .get('/api/customers')
      .set('Accept', 'application/json')
      .expect(200)
  })

  it('should succeed creating a customer', async function () {

    const customer = {
      name: 'Marianne Thomsen',
      city: 'Vestbirk',
      state: 'Østjylland',
      country: 'DK',
      mail: 'lars@example.com'
    }

    return await request(app)
      .post('/api/customers')
      .send(customer)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
  })
})
})
