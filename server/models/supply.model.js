const { dbConnection } = require("../config/db");
const { DataTypes } = require("sequelize");

const Supply = dbConnection.define("supplies", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  primavera_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  km_before: { type: DataTypes.DOUBLE, allowNull: false },
  km_actual: { type: DataTypes.DOUBLE, allowNull: false },
  km_traveled: { type: DataTypes.DOUBLE, allowNull: false },
  liters_supplied: { type: DataTypes.DOUBLE, allowNull: false },
  value_supplied: { type: DataTypes.DOUBLE, allowNull: false },
  liters_spent: { type: DataTypes.DOUBLE, allowNull: false },
  requestor: { type: DataTypes.STRING, allowNull: false },
  requested_date: { type: DataTypes.DATE, allowNull: false },
  car_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "car_id",
    references: {
      model: "cars",
      key: "id",
    },
  },
  primavera_file: {type: DataTypes.STRING, allowNull: true},
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "user_id",
    references: {
      model: "users",
      key: "id",
    },
  },
});

module.exports = { Supply };
