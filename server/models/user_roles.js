const { dbConnection } = require("../config/db");
const { DataTypes } = require("sequelize");
const { User } = require("./user.model");
const { Role } = require("./role.model");

const UserRoles = dbConnection.define("user_roles", {
  RoleId: {
    type: DataTypes.INTEGER,
    field: "role_id",
    references: {
      model: Role, // 'Actors' would also work
      key: "id",
    },
  },
  UserId: {
    type: DataTypes.INTEGER,
    field: "user_id",
    references: {
      model: User, // 'Movies' would also work
      key: "id",
    },
  },
});

module.exports = { UserRoles };
