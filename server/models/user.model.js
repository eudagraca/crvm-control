const { DataTypes } = require("sequelize");
const { dbConnection } = require("../config/db");

const User = dbConnection.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  email: { type: DataTypes.STRING, required: true, trim: true, unique: true },
  username: {
    type: DataTypes.STRING,
    required: true,
    trim: true,
    unique: true,
  },
  first_name: { type: DataTypes.STRING, required: true },
  password: { type: DataTypes.STRING, required: true },
  phone: { type: DataTypes.STRING, required: true, unique: true },
  last_name: { type: DataTypes.STRING, required: true },
  accessToken: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`;
    },
    set(value) {
      throw new Error("Do not try to set the `fullName` value!");
    },
  },
});

module.exports = { User };
