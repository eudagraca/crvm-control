const http = require("http");
const app = require("./app");
const { dbConnection } = require("./config/db");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

dbConnection
  .sync({ alter: true })
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
server.listen(PORT, function () {
  console.log("🌍 API listening on port " + PORT);
});
