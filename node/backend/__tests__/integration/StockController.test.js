/* eslint-disable no-undef */
const requeste = require('supertest');
const app = require('../../src/index');

describe('Get Actual Quote', () => {
  it('should be able to find actual quote', async () => {
    const response = await requeste(app)
      .get('/stocks/ibm/quote');
    expect(response.body).toHaveProperty('name');
  });
  it('should fail to find an unexistent Stock and return an error', async () => {
    const response = await requeste(app).get('/stocks/asdasd/quote');
    expect(response.body).toHaveProperty('error');
  });
});
//
//
//
//
//
describe('calculate earnings', () => {
  it('should be able to calculate earnings receiving a date range', async () => {
    const response = await requeste(app)
      .get('/stocks/IBM/gains?purchasedAmount=20&purchasedAt=1999-11-01&finalDate=1999-11-03');
    expect(response.body).toHaveProperty('capitalGains');
  });
});
//
//
//
//
//
describe('Get history', () => {
  it('get historical price receiving a date range', async () => {
    const response = await requeste(app)
      .get('/stocks/IBM/history?from=1999-11-01&to=1999-11-05');
    expect(response.body).toHaveProperty('prices');
  });
});
//
//
//
//
//
describe('Compare Actions', () => {
  const expected = [
    {
      name: 'IBM',
      lastPrice: 120.33,
      pricedAt: '2021-03-02T00:00:00.000Z',
    },
    {
      name: 'TESO',
      lastPrice: 3.7,
      pricedAt: '2017-12-15T00:00:00.000Z',
    },
  ];
  it('should be able to compare stoks when receive an array of stocks', async () => {
    const response = await requeste(app).post('/stocks/TESO/compare')
      .send({ stocks: ['ibm'] });
    expect(response.body).toEqual(expect.arrayContaining(expected));
  });

  it('should be able to compare stoks and detect wich one does not exist ', async () => {
    const expectedWithErrors = [
      {
        error: 'ativo não encontrado',
      },
      {
        name: 'IBM',
        lastPrice: 120.33,
        pricedAt: '2021-03-02T00:00:00.000Z',
      },
      {
        name: 'TESO',
        lastPrice: 3.7,
        pricedAt: '2017-12-15T00:00:00.000Z',
      },
    ];
    const response = await requeste(app).post('/stocks/TESO/compare')
      .send({ stocks: ['asdasd', 'ibm'] });
    expect(response.body).toEqual(expect.arrayContaining(expectedWithErrors));
  });
});
