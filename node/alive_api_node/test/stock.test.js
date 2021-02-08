const request = require('supertest');
const app = require('../src/app');

//Constantes Test - Quote, Compare, Gains, History
const QUOTE_ACT = 'PETR4.SA'
const INVALID_QUOTE_ACT = 'PETR432.SA'


//Constantes Test - Compare
const LIST_QUOTE_COMPARE = ["TIMP3.SA", "VIVT4.SA", "VALE5.SA"];

//Constantes Test - Gains
const PURCHASED_AMOUNT = 100;
const PURCHASED_AT = '2021-01-05';
const INVALID_PURCHASED_AT = '2020-01-04';


//Constantes Test - History
const FROM_DATE = '2021-01-04';
const TO_DATE = '2021-01-20';


/*
  A chave gratuíta da API Alpha Vantage, possui um limite de 5 requisições por minuto, e 
  um total de 500 requisições por dia. Como possuimos um total de 8 Tests implentados, sugiro 
  que os testes sejam realizados em blocos.
*/


/*
  Testes referente a Rota Stock - Quote
*/

test('Stock - Quote - Deve retornar a cotação mais atual da Ação.', async() => {
  const res = await request(app).get(`/stocks/${QUOTE_ACT}/quote`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('lastPrice');
    expect(res.body).toHaveProperty('pricedAt');
})

test('Stock - Quote - Deve retornar erro ao informar uma Ação inválida.', async() => {
  const res = await request(app).get(`/stocks/${INVALID_QUOTE_ACT}/quote`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe(`Invalid Stock Name ${INVALID_QUOTE_ACT}`);
});



/*
  Testes referente a Rota Stock - Compare
*/

test('Stock - Compare - Deve retornar a comparação de cotas entre Ações.', async() => {
  const res = await request(app).get(`/stocks/${QUOTE_ACT}/compare`).send({
    "stocks": LIST_QUOTE_COMPARE
  });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('listPrices');
});



/*
  Testes referente a Rota Stock - Gains
*/


test('Stock - Gains - Deve retornar a projeção de ganhos em uma data específica.', async() => {
  const res = await request(app).get(`/stocks/${QUOTE_ACT}/gains?purchasedAmount=${PURCHASED_AMOUNT}&purchasedAt=${PURCHASED_AT}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('name');
  expect(res.body).toHaveProperty('purchasedAmount');
  expect(res.body).toHaveProperty('purchasedAt');
  expect(res.body).toHaveProperty('priceAtDate');
  expect(res.body).toHaveProperty('lastPrice');
  expect(res.body).toHaveProperty('capitalGains');
});

test('Stock - Gains - Deve retornar erro ao informar uma Ação inválida.', async() => {
  const res = await request(app).get(`/stocks/${INVALID_QUOTE_ACT}/gains?purchasedAmount=${PURCHASED_AMOUNT}&purchasedAt=${PURCHASED_AT}`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe(`Invalid Stock Name ${INVALID_QUOTE_ACT}`);
});

test('Stock - Gains - Deve retornar erro quando informada uma data sem cota.', async() => {
  const res = await request(app).get(`/stocks/${QUOTE_ACT}/gains?purchasedAmount=${PURCHASED_AMOUNT}&purchasedAt=${INVALID_PURCHASED_AT}`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe(`Price on purchase date ${INVALID_PURCHASED_AT} for stock was not found ${QUOTE_ACT}`);
});



/*
  Testes referente a Rota Stock - History
*/


test('Stock - History - Deve retornar o preço histórico da ação em um intervalo incluso.', async() => {
  const res = await request(app).get(`/stocks/${QUOTE_ACT}/history?from=${FROM_DATE}&to=${TO_DATE}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('name');
  expect(res.body).toHaveProperty('prices');
});

test('Stock - History - Deve retornar erro ao informar uma Ação inválida.', async() => {
  const res = await request(app).get(`/stocks/${INVALID_QUOTE_ACT}/history?from=${FROM_DATE}&to=${TO_DATE}`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe(`Invalid Stock Name ${INVALID_QUOTE_ACT}`);
});
