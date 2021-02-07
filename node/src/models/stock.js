const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Stock = sequelize.define("stock", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  pricing: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Stock;
