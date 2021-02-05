import supertest from "supertest";
import { Server } from "../src/server";
import {
  QUOTE_ACT,
  INVALID_QUOTE_ACT,
  LIST_QUOTE_COMPARE,
  PURCHASED_AMOUNT,
  PURCHASED_AT,
  FROM_DATE,
  TO_DATE,
} from "../src/constants";

const app = new Server();
app.listen(3000);

//QUOTE

test("Stock - Quote - RETURN ACTION INVALID", async () => {
  const res = await supertest(app).get(`/stocks/${INVALID_QUOTE_ACT}/quote`);
  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Erro nos dados informados");
});

//COMPARE

test("Stock - Compare - RETURN COMPARE TWO ACTIONS", async () => {
  const res = await supertest(app).post(`/stocks/${QUOTE_ACT}/compare`).send({
    stocks: LIST_QUOTE_COMPARE,
  });
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("listPrices");
});

//GAINS

test("Stock - Gains - RETURN SPECIFIC GAINS", async () => {
  const res = await supertest(app).get(
    `/stocks/${QUOTE_ACT}/gains?purchasedAmount=${PURCHASED_AMOUNT}&purchasedAt=${PURCHASED_AT}`
  );
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("name");
  expect(res.body).toHaveProperty("purchasedAmount");
});

//HISTORY

test("Stock - History - RETURN PRICE INTERVAL", async () => {
  const res = await supertest(app).get(
    `/stocks/${QUOTE_ACT}/history?from=${FROM_DATE}&to=${TO_DATE}`
  );
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("prices");
});
