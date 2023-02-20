const { dbConnection } = require("../config/db");
const { DataTypes } = require("sequelize");

const Category = dbConnection.define(
  "categories",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Category };
