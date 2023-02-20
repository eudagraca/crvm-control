const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const { authJwt } = require("../middleware");

userRouter.get(
  "",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.findAll,
);
userRouter.get("/:id",  userController.findOne);

module.exports = userRouter;
