const { Supply, Car } = require("../models");

exports.getAll = () => {
  const supplies = Supply.findAll({ include: Car });
  return supplies;
};

exports.findOne = (id) => {
  const supply = Supply.findByPk(id, { include: Car });
  return supply;
};
