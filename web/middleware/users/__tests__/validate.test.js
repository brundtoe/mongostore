const validate = require('../validate')
const Joi = require('joi')

describe('Validering af users schema', () => {

  const res = jest.fn()
  const next = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Should succeed with user show', () => {
    const req = {
      params: {
        id: 4
      }
    }
    validate.show(req, res, next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should fail to show with user string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.show(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Customer Id skal være numerisk' })
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

  test('Should fail to delete with order string', () => {
    const req = {
      params: {
        id: 'dummy'
      }
    }
    validate.delete(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeInstanceOf(Joi.ValidationError)
    expect(next.mock.calls[0][0]).toMatchObject({ message: 'Customer Id skal være numerisk' })
    expect(next.mock.calls[0][0]).toMatchObject({ status: 400 })
  })


  test('Should succeed with post order', () => {
    const req = {
      body: {
        name: 'Jens Andersen',
        city: 'Nakskov',
        state: 'Lolland',
        country: 'DK',
        mail: 'jens@exampl.com'
      }
    }
    validate.post(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })

  test('Should succeed with put order', () => {
    const req = {
      body: {
        _id: "5eef84a264ee594e266c8dd3",
        id: 33,
        name: 'Jens Andersen',
        city: 'Nakskov',
        state: 'Lolland',
        country: 'DK',
        mail: 'jens@exampl.com'
      }
    }
    validate.put(req,res,next)
    expect(next.mock.calls.length).toBe(1)
    expect(next.mock.calls[0][0]).toBeUndefined()
  })
})
