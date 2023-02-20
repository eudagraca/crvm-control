exports.sendErrorResponse = (res, code, errorMessage, e = null) => {
  res.status(code).send({
    status: "error",
    message: errorMessage,
    e: e?.toString(),
  });
  return;
};

exports.sendSuccessResponse = (res, code, data, message, e = null) => {
  res.status(code).send({
    status: "success",
    data: data,
    message: message,
  });
  return;
};
