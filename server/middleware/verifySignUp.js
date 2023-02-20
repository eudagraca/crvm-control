const { User } = require("../models");
const { sendErrorResponse } = require("../service/responses.service");
const { ROLES } = require("../service/roles");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      sendErrorResponse(
        res,
        400,
        "Falha! Nome de usuario já encontra-se registado!"
      );
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        sendErrorResponse(res, 400, "Falha! Email já está sendo usado!");
        return;
      } else {
        User.findOne({
          where: {
            phone: req.body.phone,
          },
        }).then((user) => {
          if (user) {
            sendErrorResponse(res, 400, "Falha! Telefone já está sendo usado!");
            return;
          }
        });
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        sendErrorResponse(res, 400, "Falha! Esta função não existe = " + req.body.roles[i]);
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
