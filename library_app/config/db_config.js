const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sharpener", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
