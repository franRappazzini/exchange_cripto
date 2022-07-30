const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;
const modelUser = require("./models/User");
const modelWallet = require("./models/Wallet");
const modelCoin = require("./models/PurchasedCoin");

const sequelize = new Sequelize(
  `postgres://postgres:123456@localhost:5432/exchange`,
  { logging: false }
);

modelUser(sequelize, DataTypes);
modelWallet(sequelize, DataTypes);
modelCoin(sequelize, DataTypes);

// associations
const { User, Wallet, PurchasedCoin } = sequelize.models;
User.hasOne(Wallet);
Wallet.belongsTo(User);

Wallet.hasMany(PurchasedCoin);
PurchasedCoin.belongsTo(Wallet);

module.exports = { sequelize, ...sequelize.models };
