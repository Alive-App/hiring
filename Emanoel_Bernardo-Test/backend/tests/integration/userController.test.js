const request = require('supertest')
const app = require('../../src/app')



describe('Stocks controller tests', () => {

    it('Create user - no body', async () => {

        const response = await request(app)
            .post('/user')
            .send({})

        expect(response.status).toBe(400)
    })

    it('Create user', async () => {

        const email = `jest@test${Math.random()*2000}.com`

        const response = await request(app)
            .post('/user')
            .send({
                email,
                password: '1234567'
            })

        expect(response.status).toBe(200)
    })
    it('Login', async () => {

        const response = await request(app)
            .post('/login')
            .send({
                email: 'jest@test.com',
                password: '1234567'
            })

        expect(response.status).toBe(200)
    })
})