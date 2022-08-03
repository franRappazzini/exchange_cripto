module.exports = (sequelize, DataTypes) => {
  sequelize.define("TradingCoin", {
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    investmentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ppc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
