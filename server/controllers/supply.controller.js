const { Supply, Car } = require("../models/index");
const service = require("../service/supply.service");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../service/responses.service");
exports.create = async (req, res) => {
  let data = {};
  data = req.body;
  const file_name = req.file.path;
  data.primavera_file = file_name;
  const { userId } = req;
  data.user_id = userId;

  Car.findByPk(data.car_id)
    .then((car) => {
      if (car) {
        if (data.liters_supplied > car.maximum) {
          return res.status(400).send({
            data: data,
            status: "FAILED",
            message:
              "A quantidade a abastecer não pode ser superior a capacidade máxima do tanque",
          });
        }
        data.km_traveled = data.km_actual - data.km_before;
        data.liters_spent = data.km_traveled * (car.engine * 0.1);

        Supply.create(data)
          .then((supply) => {
            return res
              .status(200)
              .send({ data: supply, status: "OK", message: "Successfully" });
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ error: err.message || " while supply" });
          });
      } else {
        return res.status(404).send({ data: body, status: "OK" });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ error: err.message || " while getting car" });
    });
};

exports.findAll = (req, res) => {
  service
    .getAll()
    .then((data) => {
      console.log(data);
      return sendSuccessResponse(res, 200, data, "Cars");
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
  try {
    const { id } = req.params;
    service
      .findOne(id)
      .then((data) => {
        return sendSuccessResponse(res, 200, data, "Cars");
      })
      .catch((err) => {
        sendErrorResponse(
          res,
          500,
          "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
          err
        );
        return;
      });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Não foi possível executar a operação neste momento, tente novamente mais tarde.",
      error
    );
    return;
  }
};

// PDF View
exports.getDocument = async (req, res) => {
  const filePath = req.params.primavera_file;
  if (filePath) {
    if (fs.existsSync(filePath)) {
      res.contentType("application/pdf");
      res.setHeader(
        "Content-Type",
        "application/pdf",
        "Content-Disposition",
        `inline;filename=${filePath}`
      );
      return fs.createReadStream(path).pipe(res);
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
