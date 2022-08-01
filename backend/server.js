const express = require("express");
const server = express();
const { sequelize, User, Wallet } = require("./db");
const usersRouter = require("./routes/users");
const coinsRouter = require("./routes/coins");
const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use("", usersRouter);
server.use("", coinsRouter);

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
