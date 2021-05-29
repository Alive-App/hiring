import request from 'supertest'
import app from '../index'

describe('StockController', () => {
  it('qoute(): should respond with object of stock price', async () => {
    const symbol = 'IBM'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/quote`)
      .expect(200)

    expect(body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        lastPrice: expect.any(Number),
        pricedAt: expect.any(String)
      })
    )
  })

  it('quote(): should respond 404 if symbol not found', async () => {
    const symbol = 'WRONGSTOCK'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/quote`)
      .expect(404)

    expect(body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: 'Symbol not found'
      })
    )
  })
})
