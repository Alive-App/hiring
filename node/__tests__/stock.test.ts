import { Server } from "../src/server";
import {
  QUOTE_ACT,
  QUOTE_ACT_GAINS,
  QUOTE_ACT_COMPARE,
  INVALID_QUOTE_ACT,
  LIST_QUOTE_COMPARE,
  PURCHASED_AMOUNT,
  PURCHASED_AT,
  FROM_DATE,
  TO_DATE,
} from "../src/constants";

const app = new Server();
app.listen(3000);

let supertest = require("supertest")(app.getExpressInstance());

//QUOTE

test("Stock - Quote - RETURN ACTION INVALID", async () => {
  const res = await supertest.get(`/stocks/${INVALID_QUOTE_ACT}/quote`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Erro nos dados informados");
});

//COMPARE

test("Stock - Compare - RETURN COMPARE TWO ACTIONS", async () => {
  const res = await supertest
    .post(`/stocks/${QUOTE_ACT_COMPARE}/compare`)
    .send({
      stocks: LIST_QUOTE_COMPARE,
    });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("listPrices");
});

//GAINS

test("Stock - Gains - RETURN SPECIFIC GAINS RETURN ERROR", async () => {
  const res = await supertest.get(
    `/stocks/${QUOTE_ACT_GAINS}/gains?purchasedAmount=${PURCHASED_AMOUNT}&purchasedAt=${PURCHASED_AT}`
  );
  expect(res.status).toBe(400);
});

//HISTORY

test("Stock - History - RETURN PRICE INTERVAL ERROR", async () => {
  const res = await supertest.get(
    `/stocks/${QUOTE_ACT}/history?from=${FROM_DATE}&to=${TO_DATE}`
  );
  expect(res.status).toBe(400);
});
