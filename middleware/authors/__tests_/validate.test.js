const validate = require('../validate')
const Joi = require('@hapi/joi')

describe('Validering af author schema', () => {

  const res = jest.fn()
  const next = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should succeed with author show', () => {
    const req = {
      params: {
        id: 4
      }
    }
    validate.show(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should fail with author string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.show(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be a number' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('should validate delete with number', () => {
    const req = {
      params: {
        id: 4
      }
    }
    validate.delete(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should delete with author string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.delete(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: '"value" must be a number' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })

  test('Should post succeed with author', () => {
    const req = {
      body: {
        firstname: 'Jens',
        lastname: 'Larsen',
        mail: 'jens@larsen.com'
      }
    }
    validate.post(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should put succeed with author', () => {
    const req = {
      body: {
        _id: "5eef84a264ee594e266c8dd3",
        id: 33,
        firstname: 'Jens',
        lastname: 'Larsen',
        mail: 'jens@larsen.com'
      }
    }
    validate.put(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

})
