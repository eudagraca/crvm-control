const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { authJwt, verifySignUp } = require("../middleware");

authRouter.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
    authJwt.verifyToken,
    authJwt.isAdmin,
  ],
  authController.create
);
authRouter.post("/signin", authController.signIn);

module.exports = authRouter;
