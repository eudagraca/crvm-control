require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User, Role } = require("../models");
const SECRET = process.env.JWT_SECRET;

exports.signUp = async (data) => {
  // Save User to Database
  await User.create({
    username: data.username,
    email: data.email,
    password: bcrypt.hashSync(data.password, 8),
    first_name: data.first_name,
    last_name: data.first_name,
    first_name: data.first_name,
    phone: data.phone,
  })
    .then((user) => {
      if (data.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: data.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            return { user: user, message: "Usuário registado com sucesso!" };
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then((response) => {
          return { user: user, message: "Usuário registado com sucesso!" };
        });
      }
    })
    .catch((err) => {
      return { message: err.message };
    });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return { message: "Usuário não encontrado." };
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return {
          user: user,
          accessToken: null,
          message: "Senha inválida!",
        };
      }
      var token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
          },
        };
      });
    })
    .catch((err) => {
      return { message: err.message };
    });
};

exports.getAll = () => {
  try {
    const users = User.findAll({
      include: [
        {
          model: Role,
          // through: { where: { amount: 10 } },
        },
      ],
    });
    return users;
  } catch (error) {
    return error;
  }
};

exports.fetOne = (userId) => {
  try {
    const user = User.findByPk(userId, {
      include: [
        {
          model: Role,
        },
      ],
    });
    return user;
  } catch (error) {
    return error;
  }
};
