const express = require("express");
const car = require("../controllers/car.controller");
const { authJwt } = require("../middleware");
const carRouter = express.Router();

carRouter.get("", [authJwt.verifyToken], car.findAll);
carRouter.get("/:userId", [authJwt.verifyToken], car.findOne);
// carRouter.get("/ranked", car.findAllWithSupplies);
carRouter.post("", [authJwt.verifyToken], car.create);

module.exports = carRouter;
