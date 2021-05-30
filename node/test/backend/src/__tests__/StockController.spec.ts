import request from 'supertest'
import AxiosMock from 'axios-mock-adapter'

import app from '../index'
import api from '../services/api'

const apiMock = new AxiosMock(api)

describe('StockController', () => {
  beforeEach(() => {
    apiMock.reset()
  })

  it('qoute(): should respond a object of stock price', async () => {
    const symbol = 'IBM'

    apiMock.onGet('/query').reply(200, {
      'Global Quote': {
        '01. symbol': 'IBM',
        '05. price': '143.7400',
        '07. latest trading day': '2021-05-28'
      }
    })

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

    apiMock.onGet('/query').reply(200)

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

    apiMock.onGet('/query').reply(200, {
      'Meta Data': {
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-05-28'
      },
      'Time Series (Daily)': {
        '2021-05-28': {
          '1. open': '144.21',
          '2. high': '144.33',
          '3. low': '143.485',
          '4. close': '143.74'
        },
        '2021-05-27': {
          '1. open': '143.82',
          '2. high': '144.77',
          '3. low': '143.63',
          '4. close': '143.82'
        },
        '2021-05-26': {
          '1. open': '143.5',
          '2. high': '143.9894',
          '3. low': '143.04',
          '4. close': '143.38'
        },
        '2021-05-25': {
          '1. open': '144.92',
          '2. high': '145.0',
          '3. low': '143.2',
          '4. close': '143.79'
        },
        '2021-05-24': {
          '1. open': '145.06',
          '2. high': '145.39',
          '3. low': '144.18',
          '4. close': '144.72'
        }
      }
    })

    const { body } = await request(app)
      .get(`/stocks/${symbol}/history`)
      .query({
        from: '2021-05-24',
        to: '2021-05-28'
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

    apiMock.onGet('/query').reply(200)

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

    apiMock.onGet('/query').reply(200, {
      'Global Quote': {
        '01. symbol': 'IBM',
        '05. price': '143.7400',
        '07. latest trading day': '2021-05-28'
      }
    })

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

    apiMock.onGet('/query').reply(200, {
      'Meta Data': {
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2021-05-28'
      },
      'Time Series (Daily)': {
        '2021-05-28': {
          '1. open': '144.21',
          '2. high': '144.33',
          '3. low': '143.485',
          '4. close': '143.74'
        },
        '2021-05-27': {
          '1. open': '143.82',
          '2. high': '144.77',
          '3. low': '143.63',
          '4. close': '143.82'
        },
        '2021-05-26': {
          '1. open': '143.5',
          '2. high': '143.9894',
          '3. low': '143.04',
          '4. close': '143.38'
        },
        '2021-05-25': {
          '1. open': '144.92',
          '2. high': '145.0',
          '3. low': '143.2',
          '4. close': '143.79'
        },
        '2021-05-24': {
          '1. open': '145.06',
          '2. high': '145.39',
          '3. low': '144.18',
          '4. close': '144.72'
        }
      }
    })

    const { body } = await request(app)
      .get(`/stocks/${symbol}/gains`)
      .query({
        purchasedAmount: '100',
        purchasedAt: '2021-05-24'
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
