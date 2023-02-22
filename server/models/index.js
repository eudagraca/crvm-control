const { Car } = require("./car.model");
const { Category } = require("./category.model");
const { Role } = require("./role.model");
const { Supply } = require("./supply.model");
const { User, Roles } = require("./user.model");
const { UserRoles } = require("./user_roles");

Category.hasMany(Car, {
  foreignKey: "category_id",
});
Car.belongsTo(Category, {
  foreignKey: "category_id",
});

Supply.belongsTo(Car, {
  foreignKey: "car_id",
});

Car.belongsTo(Role, {
  foreignKey: "role_id",
});

Car.hasMany(Supply, {
  foreignKey: "car_id",
});

Role.belongsToMany(User, {
  through: UserRoles,
  foreignKey: "role_id",
  otherKey: "user_id",
});

User.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: "user_id",
  otherKey: "role_id",
});

Car.belongsTo(User, {
  foreignKey: "user_id",
});

// User.belongsTo(Car, {
//   foreignKey: "car_id",
// });

Supply.belongsTo(User, {
  foreignKey: "user_id",
});

// User.belongsTo(Supply, {
//   foreignKey: "supply_id",
// });

module.exports = {
  Car,
  Category,
  Supply,
  User,
  Role,
};
