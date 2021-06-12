import request from 'supertest'
import { app } from './app'

describe('Routes', () => {
  test('GET /stocks/:stockName/quote', () => {
    request(app)
      .get('/stocks/IBM/quote')
      .expect(200)
  })
})
