const { Router } = require("express");
const { User, Wallet, TradingCoin } = require("../db");
const users = Router();

users.post("/users", async (req, res) => {
  const { name, lastName, email, password } = req.body;
  const data = { name, lastName, email, password };

  try {
    const newUser = await User.create(data);
    const dataWallet = { UserId: newUser.id, availableMoney: 0 }; // creacion de wallet para user
    await Wallet.create(dataWallet);

    res.status(201).json({ success: "Usuario creado con exito!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

users.get("/users", async (req, res) => {
  try {
    const response = await User.findAll({
      include: { model: Wallet, include: { model: TradingCoin } },
    });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

users.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await User.findOne({
      where: { id },
      include: { model: Wallet, include: { model: TradingCoin } },
    });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = users;
