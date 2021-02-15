const request = require("supertest");
const app = require("./server.js");

describe("Test /stocks/quote", () => {
  test("get stock_name correto", async () => {
    const response = await request(app).get("/stocks/quote?stock_name=aapl")
    //.set("stock_name", "AAPL");

    //console.log(response.body);
    expect(response.statusCode).toBe(200);
    /*return fetchData().then(data => {
      expect(response.statusCode).toBe(200);
      console.log(data)
    });*/
  });

  test("get cacheQuote stock_name correto ", async () => {
    const t0 = performance.now()
    await request(app).get("/stocks/quote?stock_name=GOGL")
    const difTime = (performance.now() - t0)

    // Cache -----
    const t0Cache = performance.now()
    await request(app).get("/stocks/quote?stock_name=GOGL")
    const difTimeCache = (performance.now() - t0Cache)

    console.log(difTime, difTimeCache);
    const result = difTime < difTimeCache
    expect(result).toBe(false);
  });

  test("get stock_name incorreto ", async () => {
    const response = await request(app).get("/stocks/quote?stock_name=bova11")
    expect(response.statusCode).toBe(200);
  });
});