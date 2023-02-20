const express = require("express");
const supplyRouter = express.Router();
const supply = require("../controllers/supply.controller");
const { authJwt } = require("../middleware");

supplyRouter.post("/",[authJwt.verifyToken], supply.create);
supplyRouter.get("/", [authJwt.verifyToken], supply.findAll);
supplyRouter.get("/:id",  supply.findOne);

module.exports = supplyRouter;
// [authJwt.verifyToken],