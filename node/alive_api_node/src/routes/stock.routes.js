const express = require('express');
const router = express.Router();
const stockCtr = require('../controllers/StockController');

router.get('/:stock_name/quote', stockCtr.quote);
router.post('/:stock_name/compare', stockCtr.compare);
router.get('/:stock_name/gains', stockCtr.gains);
router.get('/:stock_name/history', stockCtr.history);

module.exports = router;