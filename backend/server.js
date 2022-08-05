require("dotenv").config();
const express = require("express");
const server = express();
const { sequelize, User, Wallet } = require("./db");
const usersRouter = require("./routes/users");
const coinsRouter = require("./routes/coins");
const walletsRouter = require("./routes/wallets");
// const cors = require("cors");

server.use(express.json());
// server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("", usersRouter);
server.use("", coinsRouter);
server.use("", walletsRouter);

server.listen(3001, () => {
  sequelize.sync({ force: false });
  console.log("Server listening on port: 3001");
});
