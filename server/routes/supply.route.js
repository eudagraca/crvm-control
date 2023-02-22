const express = require("express");
const supplyRouter = express.Router();
const supply = require("../controllers/supply.controller");
const { authJwt } = require("../middleware");
const multer = require("multer"),
  path = require("path");
  

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/primavera");
  },
  filename: function (req, file, cb) {
    const { primavera_id, car_id } = req.body;
    // const originalName = file.originalname.replace(/\s/g, "_");
    const ext = path.extname(file.originalname);
    const finalName = `Requisicao_${primavera_id}_${car_id}${ext}`;
    cb(null, finalName);
  },
});

const upload = multer({ storage: storage });

supplyRouter.post(
  "/",
  [authJwt.verifyToken],
  upload.single("primavera_file"),
  supply.create
);
supplyRouter.get("/", [authJwt.verifyToken], supply.findAll);
supplyRouter.get("/:id", supply.findOne);
supplyRouter.get("/:id", supply.getDocument);

module.exports = supplyRouter;
// [authJwt.verifyToken],
