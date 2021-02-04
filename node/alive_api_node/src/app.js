const express = require('express');
const cors = require('cors');

const app = express();

//Configurando Cors
app.use(cors());
app.use(function(req, res, next) {
    req.header("Content-Type", "application/json");
    res.header("Content-Type", "application/json");
    next();
});

//Routes
const apiRoutes = require('./routes/index');

//app.get
app.get('/', (req, res)=>{
    res.status(200).send();
});

//app.use
app.use('/', apiRoutes);

module.exports = app;



