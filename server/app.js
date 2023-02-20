const express = require("express");
const app = express();
const carRouter = require("./routes/car.route");
const categoryRouter = require("./routes/category.route");
const supplyRouter = require("./routes/supply.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initRoles } = require("./controllers/auth.controller");
const { authJwt } = require("./middleware");
app.use(bodyParser.json());

app.use(cors());

var allowlist = ["http://localhost:3001/"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/categories", categoryRouter);
app.use("/supplies", supplyRouter);
app.get("/", function (req, res) {
  console.log(req);
});
app.get("/roles",   [authJwt.verifyToken, authJwt.isAdmin], initRoles);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

module.exports = app;
