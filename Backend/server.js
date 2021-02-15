const express = require("express");
const yahooFinance = require("yahoo-finance");
const compression = require("compression");
const cors = require("cors");
const app = express();

app.use(compression());
app.use(cors({ origin: "http://localhost:3000" }));

var cacheQuote = {};
var cacheHistory = {};

const quote = (stock) => {
  return new Promise(async (resolve, reject) => {
    stock = [...stock];
    if (Array.isArray(stock)) {
      await yahooFinance.quote(
        {
          symbols: stock,
          modules: ["price"],
        },
        (err, quotes) => {
          if (!err) {
            //console.log(quotes);
            stock.forEach((e) => {
              //console.log(e, "quote: ", quotes[e].price.regularMarketPrice);
              cacheQuote[e] = quotes[e].price;
            });
            resolve(true);
            return;
          } else {
            console.log("------err--------");
            reject(true);
            return;
          }
        }
      );
    } else {
      //console.log(stock);
      reject(true);
      return;
    }
  });
};

const history = (stock, from, to) => {
  return new Promise((resolve, reject) => {
    yahooFinance.historical(
      {
        symbol: stock,
        from: from,
        to: to,
      },
      async (err, quotes) => {
        if (!err) {
          const result = {
            name: stock,
            prices: quotes.map((e) => {
              return {
                opening: Number(e.open),
                low: Number(e.low),
                high: Number(e.high),
                closing: Number(e.close),
                pricedAt: new Date(e.date).toISOString(),
              };
            }),
          };

          if (!cacheHistory[stock]) {
            cacheHistory[stock] = {};
          }
          cacheHistory[stock][from + "/" + to] = result;
          console.log(stock, "history: ", result.prices.length);
          resolve(result);
        }
        reject();
      }
    );
  });
};

app.get("/stocks/history", async (req, res) => {
  console.log(req.query.stock_name);
  let dateFrom = new Date(req.query.from);
  if (req.query.from && dateFrom) {
    let dateTo = new Date(req.query.to);
    if (req.query.to) {
      if (
        req.query.stock_name &&
        typeof req.query.stock_name == "string" &&
        req.query.stock_name.length < 32
      ) {
        let newHistory = history(req.query.stock_name, dateFrom.toISOString().slice(0,10), dateTo.toISOString().slice(0,10));
        if (cacheHistory[req.query.stock_name]) {
          console.log("cacheHistory");
          const data = req.query.from + "/" + req.query.to;
          if (cacheHistory[req.query.stock_name][data]) {
            res.json(
              cacheHistory[req.query.stock_name][
                req.query.from + "/" + req.query.to
              ]
            );
            return;
          } else {
            res.json(await newHistory);
            return;
          }
        }
        res.json(await newHistory);
        return;
      } else {
        res.status(400).send("erro stock_name: ", req.query.stock_name);
        return;
      }
    } else {
      res.status(400).send("erro to: ", req.query.to);
      return;
    }
  } else {
    res.status(400).send("erro from: ", req.query.from);
    return;
  }
});

app.get("/stocks/quote", async (req, res) => {
  console.log("req.query", req.query.stock_name);
  if (
    req.query.stock_name &&
    typeof req.query.stock_name == "string" &&
    req.query.stock_name.length < 32
  ) {
    let symbols = req.query.stock_name;
    symbols = symbols.split(",");

    try {
      let newQuote = quote(symbols);
      let noCache = [];
      let result = [];
      symbols.forEach((e, i) => {
        if (cacheQuote[e]) {
          result[i] = {
            name: e,
            lastPrice: cacheQuote[e].regularMarketPrice,
            pricedAt: new Date(cacheQuote[e].regularMarketTime).toISOString(), // data e hora no formato ISO 8601, UTC
          };
        } else {
          noCache.push(i);
        }
      });

      if (noCache.length > 0) {
        //console.log(noCache)
        let quoteResult = await newQuote;
        if (quoteResult) {
          for (let i = 0; i < noCache.length; i++) {
            if (cacheQuote[symbols[noCache[i]]]) {
              result[noCache[i]] = {
                name: symbols[noCache[i]],
                lastPrice: cacheQuote[symbols[noCache[i]]].regularMarketPrice,
                pricedAt: new Date(
                  cacheQuote[symbols[noCache[i]]].regularMarketTime
                ).toISOString(), // data e hora no formato ISO 8601, UTC
              };
            }
          }
        }
      }
      res.json(result);
      return;
    } catch {
      res.status(500).json("err");
    }
  } else {
    res.status(400).send("erro stock_name: ", req.query.stock_name);
    return;
  }
});

module.exports = app;
