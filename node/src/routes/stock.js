const express = require("express");

const stockController = require("../controllers/stock");

const router = express.Router();

router.get("/stocks/:stock_name/quote", stockController.getRecentQuote);

router.get("/stocks/:stock_name/history", stockController.getHistoryQuote);

router.get("/stocks/:stock_name/compare", stockController.getLastCompare);

router.post("/stocks", stockController.createRecentQuote);

module.exports = router;
