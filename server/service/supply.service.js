const { Supply, Car, User } = require("../models");

exports.getAll = () => {
  const supplies = Supply.findAll({
    include: [
      {
        model: Car,
      },
      {
        model: User,
      },
    ],
  });
  return supplies;
};

exports.findOne = (id) => {
  const supply = Supply.findByPk(id, { include: Car });
  return supply;
};
