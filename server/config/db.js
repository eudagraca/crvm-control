require("dotenv").config();
const Sequelize = require("sequelize");
const dbConnection = new Sequelize(
  `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
);

module.exports = { dbConnection, Sequelize };
