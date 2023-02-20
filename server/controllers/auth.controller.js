const { Op } = require("sequelize");
const { Role, User } = require("../models");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../service/responses.service");
const { initializeRoles } = require("../service/role.service");
const userService = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

exports.create = async (req, res, next) => {
  try {
    const { body } = req;
    User.create({
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      first_name: body.first_name,
      last_name: body.last_name,
      first_name: body.first_name,
      phone: body.phone,
    })
      .then((user) => {
        if (body.role) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: body.role,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then(() => {
              sendSuccessResponse(
                res,
                201,
                user,
                "Usuário registado com sucesso!",
                (e = null)
              );
              // return { user: user, message: "Usuário registado com sucesso!" };
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            sendSuccessResponse(
              res,
              201,
              user,
              "Usuário registado com sucesso!",
              (e = null)
            );
          });
        }
      })
      .catch((err) => {
        sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          err
        );
      });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      error.message
    );
  }
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.username }],
    },
  })
    .then((user) => {
      if (!user) {
        sendErrorResponse(res, 401, "Este usuário não existe.");
        return;
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          sendErrorResponse(res, 401,  "Senha ou usuário incorrecto!");
          return;
        }
        var token = jwt.sign({ id: user.id }, SECRET, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          sendSuccessResponse(
            res,
            200,
            {
              id: user.id,
              username: user.username,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              full_name: user.fullName,
              roles: authorities,
              accessToken: token,
            },
            "Acesso consedido, seja bem vindo"
          );
          return;
        });
      }
    })
    .catch((err) => {
      sendErrorResponse(
        res,
        500,
        {
          message:
            "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
        },
        err.message
      );
      return;
    });
};

exports.findAll = (req, res, next) => {
  try {
    userService.getAll().then((data) => {
      sendSuccessResponse(res, 200, data, "Success", (e = null));
    });
    return;
  } catch (error) {
    // (res, code, data, message, e = null)
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      error
    );
    return;
  }
};

exports.initRoles = (req, res, next) => {
  initializeRoles()
    .then((data) => {
      sendSuccessResponse(res, 200, data, "Success", (e = null));
    })
    .catch((err) => {
      sendErrorResponse(
        res,
        500,
        "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
        err
      );
      return;
    });
};
