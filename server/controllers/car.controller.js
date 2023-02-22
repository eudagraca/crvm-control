const { Car, Category, Supply } = require("../models/index");
const url = require("url");
const querystring = require("querystring");
const carService = require("../service/car.service");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../service/responses.service");

exports.create = (req, res) => {
  let { body } = req;
  const { userId } = req;
  body.user_id = userId;
  const category = Category.findByPk(body.category_id);

  if (category != null) {
    Car.create(body)
      .then((data) => {
        sendSuccessResponse(res, 201, data, "Cars");
        return;
      })
      .catch((err) => {
        sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          e
        );
        return;
      });
  }
};

exports.findAll = (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let rank = req.query.rank;
  let parsedQs = querystring.parse(url.parse(req.originalUrl).query);

  if (rank == "1") {
    carService
      .getAllCarWithSupplies(parsedQs.registration, limit, rank)
      .then((data) => {
        return sendSuccessResponse(res, 200, data, "Cars");
      })
      .catch((err) => {
        console.log(err);
        sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          e
        );
        return;
      });
  } else {
    carService
      .getAllCars(parsedQs.registration, limit)
      .then((data) => {
        return sendSuccessResponse(
          res,
          201,
          data,
          "Veículo guardado com sucesso"
        );
      })
      .catch((err) => {
        console.log(err);
        return sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          e
        );
      });
  }
};

exports.findOne = (req, res) => {
  try {
    const { userId } = req.params;
    Car.findByPk(userId, { include: Supply })
      .then((data) => {
        sendSuccessResponse(res, 200, data, "Car");
        return;
      })
      .catch((err) => {
        sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          e
        );
        return;
      });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      e
    );
    return;
  }
};
