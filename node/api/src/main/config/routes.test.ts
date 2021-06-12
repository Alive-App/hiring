import request from 'supertest'
import { app } from './app'

describe('Routes', () => {
  test('GET /stocks/:stockName/quote', () => {
    request(app)
      .get('/stocks/IBM/quote')
      .expect(200)
  })

  test('GET /stocks/:stockName/history', () => {
    request(app)
      .get('/stocks/IBM/history?from=2021-06-12T00:00:00.000Z&to=2021-05-12T20:00:00.000Z')
      .expect(200)
  })

  test('GET /stocks/:stockName/compare', () => {
    request(app)
      .get('/stocks/IBM/compare')
      .send({ stocks: ['IBM'] })
      .expect(200)
  })
})
