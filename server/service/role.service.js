const { Role } = require("../models");

exports.initializeRoles = () => {
  Role.findOrCreate({
    where: { name: "user" },
    defaults: {
      id: 1,
      name: "user",
      description: "Usuário normal"
    },
  });

  Role.findOrCreate({
    where: { name: "moderator" },
    defaults: {
      id: 2,
      name: "moderator",
      description: "Moderador"
    },
  });

  Role.findOrCreate({
    where: { name: "admin" },
    defaults: {
      id: 3,
      name: "admin",
      description: "Administrador"
    },
  });
  
  return Role.findAll();
};
