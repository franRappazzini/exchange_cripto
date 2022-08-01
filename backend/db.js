const { Sequelize, DataTypes } = require("sequelize");
// TODO hacer las variables de entorno, dotenv
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const modelUser = require("./models/User");
const modelWallet = require("./models/Wallet");
const modelCoin = require("./models/TradingCoin");

const sequelize = new Sequelize(
  `postgres://postgres:123456@localhost:5432/exchange`,
  { logging: false }
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
