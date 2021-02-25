const { Router } = require('express');
const StocksController = require('./controllers/StocksController');

const routes = new Router();

routes.get('/stocks/:symbol/quote', StocksController.actualQuote);
routes.get('/stocks/:symbol/gains', StocksController.gainsProjection);
routes.get('/stocks/:symbol/history', StocksController.historical);
routes.post('/stocks/:symbol/compare', StocksController.compare);

module.exports = routes;
