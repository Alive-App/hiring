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

  it('compare(): should respond a object with a array of last prices', async () => {
    const symbol = 'IBM'
    const stocks = ['OIBR4.SA', 'VALE5.SA']
    const { body } = await request(app)
      .post(`/stocks/${symbol}/compare`)
      .send({ stocks })
      .expect(200)

    expect(body).toEqual(
      expect.objectContaining({
        lastPrices: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            lastPrice: expect.any(Number),
            pricedAt: expect.any(String)
          })
        ])
      })
    )
  })

  it('compare(): should respond 400 if array of stocks is empty', async () => {
    const symbol = 'IBM'
    const stocks = []
    const { body } = await request(app)
      .post(`/stocks/${symbol}/compare`)
      .send({ stocks })
      .expect(400)

    expect(body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String)
      })
    )
  })

  it('gains(): should respond a object of gains in a interval', async () => {
    const symbol = 'IBM'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/gains`)
      .query({
        purchasedAmount: '100',
        purchasedAt: '2017-04-07'
      })
      .expect(200)

    expect(body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        purchasedAmount: expect.any(Number),
        purchasedAt: expect.any(String),
        priceAtDate: expect.any(Number),
        lastPrice: expect.any(Number),
        capitalGains: expect.any(Number)
      })
    )
  })

  it('gains(): should respond 400 if invalid query params', async () => {
    const symbol = 'IBM'
    const { body } = await request(app)
      .get(`/stocks/${symbol}/gains`)
      .query({
        purchasedAmount: 'WRONG',
        purchasedAt: '2017-04'
      })
      .expect(400)

    expect(body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String)
      })
    )
  })
})
