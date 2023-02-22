const { Supply, Car } = require("../models");

const fs = require("fs");
exports.getDocument = async (req, res) => {
  const filePath = req.params.primavera_path;
  if (filePath) {
    if (fs.existsSync(filePath)) {
      res.contentType("application/pdf");
      res.setHeader(
        "Content-Type",
        "application/pdf",
        "Content-Disposition",
        `inline;filename=${filePath}`
      );
      return fs.createReadStream(filePath).pipe(res);
    } else {
      return res.json({
        error: {
          status: 404,
          stack: "Ficheiro não encontrado",
          url: req.headers.referer,
        },
        message: "Ficheiro não encontrado",
      });
    }
  } else {
    return res.json({
      error: {
        status: 404,
        stack: "Ficheiro não encontrado",
        url: req.headers.referer,
      },
      message: "Ficheiro não encontrado",
    });
  }
};

//TODO Remove to better organization on dedicated controller

exports.findAndCountSupplies = function (req, res, next) {
  Supply.findAndCountAll().then(function (supplies) {
    sendSuccessResponse(res, 200, supplies, "Supplies");
  });
};

exports.findAndCountCars = function (req, res, next) {
  Car.findAndCountAll().then(function (cars) {
    sendSuccessResponse(res, 200, cars, "Supplies");
  });
};
