import request from 'supertest'
import app from '../index'

describe('StockController', () => {
  it('qoute(): should respond a object of stock price', async () => {
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
        message: expect.any(String)
      })
    )
  })

  it('historic(): should respond a object with name and array of prices', async () => {
    const symbol = 'IBM'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/history`)
      .query({
        from: '2017-04-04',
        to: '2017-04-07'
      })
      .expect(200)

    expect(body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        prices: expect.arrayContaining([
          expect.objectContaining({
            opening: expect.any(Number),
            low: expect.any(Number),
            high: expect.any(Number),
            closing: expect.any(Number),
            pricedAt: expect.any(String)
          })
        ])
      })
    )
  })

  it('historic(): should respond 400 if invalid date interval', async () => {
    const symbol = 'IBM'
    await request(app)
      .get(`/stocks/${symbol}/history`)
      .query({
        from: 'WRONGDATE',
        to: '2017-04-07'
      })
      .expect(400)

    const wrongInterval = await request(app)
      .get(`/stocks/${symbol}/history`)
      .query({
        from: '2017-04-08',
        to: '2017-04-07'
      })
      .expect(400)

    expect(wrongInterval.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String)
      })
    )
  })

  it('historic(): should respond 404 if symbol not found', async () => {
    const symbol = 'WRONGSYMBOL'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/history`)
      .query({
        from: '2017-04-04',
        to: '2017-04-07'
      })
      .expect(404)

    expect(body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String)
      })
    )
  })
})
