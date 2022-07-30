module.exports = (sequelize, DataTypes) => {
  sequelize.define("PurchasedCoin", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
    purchasePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    walletId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
