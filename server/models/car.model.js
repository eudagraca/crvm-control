const { dbConnection } = require("../config/db");
const { DataTypes } = require("sequelize");

const Car = dbConnection.define(
  "cars",
  {
    registration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    engine: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    maximum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    km_of_insertion: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    // classification: {
    //   type: DataTypes.ENUM,
    //   values: ["Caminhão", "Automóvel", "Camioneta", "Trator", "Autocarro"],
    //   allowNull: true,
    // },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",
      references: {
        model: "categories",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Car };
