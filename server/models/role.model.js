const { DataTypes } = require("sequelize");
const { dbConnection } = require("../config/db");

const Role = dbConnection.define("roles", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Role };
