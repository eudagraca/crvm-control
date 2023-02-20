const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendErrorResponse } = require("../service/responses.service");
const SECRET = process.env.JWT_SECRET;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    sendErrorResponse(
      res,
      400,
      "É necessaria uma chave privada para autenticação para ter acesso as funcionalidades"
    );
    return;
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    console.log("decoded");

    console.log(decoded);
    console.log(token);
    if (err) {
      sendErrorResponse(res, 401, "Acesso não autorizado");
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {

  User.findOne({ where: { id: req.userId } }).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      sendErrorResponse(
        res,
        403,
        "Previlégio insuficiente para aceder a esta função!"
      );
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findOne({ where: { id: req.userId } }).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      sendErrorResponse(
        res,
        403,
        "Previlégio insuficiente para aceder a esta função!"
      );
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findOne({ where: { id: req.userId } }).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      sendErrorResponse(
        res,
        403,
        "Previlégio insuficiente para aceder a esta função, precisa ser moderador ou administrador!"
      );
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
