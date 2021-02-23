const { Router } = require('express');
const StocksController = require('./controllers/StocksController');

const routes = new Router();

routes.get('/stocks', StocksController.index);

module.exports = routes;
