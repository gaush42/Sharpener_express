const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config");

const Book = sequelize.define("Book", {
  name: { type: DataTypes.STRING, allowNull: false },
  taken_on: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returned_on: { type: DataTypes.DATE, allowNull: true },
  fine: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Book;
