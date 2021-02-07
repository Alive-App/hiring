const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");
const cors = require("cors");
require("dotenv").config();

const acaoRoutes = require("./routes/stock");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(acaoRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.HOST || "3000");
  })
  .catch((err) => {
    console.log(err);
  });
