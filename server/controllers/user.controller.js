const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../service/responses.service");
const service = require("../service/user.service");

exports.findAll = (req, res, next) => {
  try {
    service.getAll().then((data) => {
      sendSuccessResponse(res, 200, data, "users");
      return;
    });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      error
    );
  }
};

exports.findOne = (req, res, next) => {
  try {
    const { id } = req.params;
    service.fetOne(id).then((data) => {
      sendSuccessResponse(res, 200, data, "user");
      return;
    });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      error
    );
  }
};
