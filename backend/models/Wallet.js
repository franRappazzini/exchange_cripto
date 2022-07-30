module.exports = (sequelize, DataTypes) => {
  sequelize.define("Wallet", {
    availableMoney: {
      type: DataTypes.FLOAT,
    },
  });
};
