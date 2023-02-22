const express = require("express");
const documentRouter = express.Router();
const document = require("../controllers/document.controller");

documentRouter.get("/:primavera_path", document.getDocument);


module.exports = documentRouter;
