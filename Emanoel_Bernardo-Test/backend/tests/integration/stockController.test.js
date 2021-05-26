const request = require('supertest')
const app = require('../../src/app')



describe('Stocks controller tests', () => {

    it('Test app', async () => {

        const response = await request(app)
            .get('/test')
            .send({})

        expect(response.status).toBe(200)
    })

    it('Testing response for requests that not contain stock name', async () => {

        const response = await request(app)
            .get('/stocks/not-exist/quote')
            .send({})

        expect(response.status).toBe(401)
    })

    it('Testing compare stocks - stocks do not sent', async () => {

        const response = await request(app)
            .post('/stocks/IBM/compare')
            .send({})

        expect(response.status).toBe(401)
    })

    it('Testing compare stocks - stocks exists', async () => {

        const response = await request(app)
            .post('/stocks/IBM/compare')
            .send({
                stocks:  ["FBOK34.SAO", "IBM"]
            })

        expect(response.status).toBe(200)
    })
    it('Testing history stocks', async () => {

        const response = await request(app)
            .get('/stocks/IBM/history')
            .send({
            })

        expect(response.status).toBe(200)
    })
})