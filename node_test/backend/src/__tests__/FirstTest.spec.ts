import request from 'supertest'
import app from '../index'

test('it should be ok', async () => {
  const routeIndex = await request(app).get('/')

  expect(routeIndex.body).toEqual({
    ok: true
  })
})
