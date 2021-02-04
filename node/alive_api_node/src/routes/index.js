const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = express.Router();

//Importação das rotas
const stockRoutes = require('./stock.routes');

//Cors
apiRouter.use(bodyParser.urlencoded({extended : true}));
apiRouter.use(bodyParser.json());

apiRouter.use('/stocks', stockRoutes);

module.exports = apiRouter;