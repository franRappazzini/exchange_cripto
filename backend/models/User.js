const { hash } = require("../utils/functions");

module.exports = (sequelize, DataTypes) => {
  sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [8] },

      set(value) {
        // TODO hacer function hash
        this.setDataValue("password", hash(value));
      },
    },
  });
};
