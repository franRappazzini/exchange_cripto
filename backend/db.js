require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
// TODO hacer las variables de entorno, dotenv
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const modelUser = require("./models/User");
const modelWallet = require("./models/Wallet");
const modelCoin = require("./models/TradingCoin");

// const sequelize = new Sequelize(
//   `postgres://postgres:123456@localhost:5432/exchange`,
//   { logging: false }
// );

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: { max: 3, min: 1, idle: 10000 },
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/exchange`,
        {
          logging: false,
          native: false,
        }
      );

modelUser(sequelize, DataTypes);
modelWallet(sequelize, DataTypes);
modelCoin(sequelize, DataTypes);

// associations
const { User, Wallet, TradingCoin } = sequelize.models;
User.hasOne(Wallet);
Wallet.belongsTo(User);

Wallet.hasMany(TradingCoin);
TradingCoin.belongsTo(Wallet);

module.exports = { sequelize, ...sequelize.models };
