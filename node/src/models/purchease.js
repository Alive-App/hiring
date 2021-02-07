const Sequelize = require("sequelize");

const sequelize = require("../database/database");

const Purchease = sequelize.define("purchease", {
  p_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
