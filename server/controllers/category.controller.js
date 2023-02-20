const { Category } = require("../models/index");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../service/responses.service");
exports.create = (req, res) => {
  const { body } = req;
  Category.create(body)
    .then((data) => {
      sendSuccessResponse(res, 201, data, "Categories");
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
};

exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      sendSuccessResponse(res, 201, data, "Categories");
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
};

exports.findOne = (req, res) => {
  Category.findByPk(req.params.pk)
    .then((data) => {
      sendSuccessResponse(res, 201, data, "Categories");
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
};
