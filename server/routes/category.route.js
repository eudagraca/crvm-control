const express = require("express");
const category = require("../controllers/category.controller");
const { authJwt } = require("../middleware");
const categoryRouter = express.Router();

categoryRouter.get(
  "",
  [authJwt.verifyToken, authJwt.isAdmin],
  category.findAll
);

categoryRouter.post(
  "",
  [authJwt.verifyToken, authJwt.isAdmin],
  category.create
);

module.exports = categoryRouter;
