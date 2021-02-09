const apiConnection = require("../utils/apiConnection");

exports.getRecentQuote = (req, res, next) => {
  const stockName = req.params.stock_name;

  apiConnection
    .get(
      `query?function=GLOBAL_QUOTE&symbol=${stockName}&apikey=${process.env.API_KEY}`
    )
    .then((quote) => {
      res.status(200).json({
        name: stockName,
        lastPrice: quote.data["Global Quote"]["05. price"],
        pricedAt: new Date(
          quote.data["Global Quote"]["07. latest trading day"]
        ).toISOString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getHistoryQuote = (req, res, next) => {
  const stockName = req.params.stock_name;
  const initialDate = new Date(req.query.from);
  const finalDate = new Date(req.query.to);
  const pricing = [];

  apiConnection
    .get(
      `query?function=TIME_SERIES_DAILY&symbol=${stockName}&outputsize=full&apikey=${process.env.API_KEY}`
    )
    .then((quotes) => {
      let quotesData = quotes.data["Time Series (Daily)"];
      for (const quote in quotesData) {
        let dateParsed = new Date(quote);
        if (dateParsed >= initialDate && dateParsed >= finalDate) {
          pricing.push({
            opening: quotesData[quote]["1. open"],
            low: quotesData[quote]["3. low"],
            high: quotesData[quote]["2. high"],
            closing: quotesData[quote]["4. close"],
            pricedAt: quote,
          });
        }
      }
      res.status(200).json({ name: stockName, prices: pricing });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getLastCompare = (req, res, next) => {
  let stockName = req.params.stock_name;
  let stocksPayload = req.body.stocks;
  let requestList = [];

  stocksPayload.push(stockName);

  stocksPayload.map((nameStock) => {
    requestList.push(
      apiConnection.get(
        `query?function=GLOBAL_QUOTE&symbol=${nameStock}&apikey=${process.env.API_KEY}`
      )
    );
  });

  Promise.all(requestList)
    .then((values) => {
      let comparatives = [];
      values.map((stock) => {
        let stockData = stock.data["Global Quote"];
        comparatives.push({
          name: stockData["01. symbol"],
          lastPrice: stockData["05. price"],
          pricedAt: stockData["07. latest trading day"],
        });
      });

      res.status(200).json({ listPrices: comparatives });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
