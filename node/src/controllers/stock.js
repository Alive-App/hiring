const Stock = require("../models/stock");
const { Op } = require("sequelize");

const dateHelper = require("../helpers/dateHelper");

exports.getRecentQuote = (req, res, next) => {
  const stockName = req.params.stock_name;
  Stock.findOne({
    where: {
      name: stockName,
    },
    order: [["createdAt", "DESC"]],
  })
    .then((findedStock) => {
      let date = dateHelper.dateIso(findedStock.createdAt);
      res.status(200).json({
        name: findedStock.name,
        lastPrice: findedStock.pricing,
        pricedAt: date,
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

  Stock.findAll({
    where: {
      name: stockName,
      createdAt: {
        [Op.gte]: initialDate,
        [Op.lte]: finalDate,
      },
    },
    order: [["createdAt", "ASC"]],
  })
    .then((stocks) => {
      Object.values(
        stocks.reduce((acc, { name, pricing, createdAt }) => {
          console.log(acc[createdAt] === createdAt);
          return acc;
        })
      );
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

  stocksPayload.push(stockName);

  Stock.findAll({
    where: {
      name: stocksPayload,
    },
    order: [["createdAt", "DESC"]],
    group: "name",
  })
    .then((stocks) => {
      let lastPrices = [];

      stocks.map((stock) => {
        let date = dateHelper.dateIso(stock.createdAt);
        let stockPrices = {
          name: stock.name,
          lastPrice: stock.pricing,
          pricedAt: date,
        };

        lastPrices.push(stockPrices);
      });

      res.status(200).json({
        lastPrices: lastPrices,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createRecentQuote = (req, res, next) => {
  let name = req.body.name;
  let price = req.body.price;

  Stock.create({
    name: name,
    pricing: price,
  }).then((_) => {
    res.status(200).json({ message: "criado" });
  });
};
