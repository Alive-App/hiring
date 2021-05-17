const express = require("express");
const router = express.Router()
const userController = require('./controllers/userController')
const stockController = require('./controllers/stockController')

router.post('/user', userController.create)
router.post('/login', userController.index)
router.get('/stocks/:stock/quote', stockController.index)
router.get('/stocks/:stock/history', stockController.getHistory)
router.post('/stocks/:stock/compare', stockController.compare)
router.get('/stocks/:stock/gains', stockController.gains)
router.get('/stocks', stockController.getStocks)
router.post('/stocks', stockController.create)
module.exports = router