const { Router } = require("express");
const { User, Wallet } = require("../db");
const user = Router();

user.post("/user", async (req, res) => {
  const { name, lastName, email, password } = req.body;
  const data = { name, lastName, email, password };
  try {
    const newUser = await User.create(data);

    const dataWallet = { UserId: newUser.id, availableMoney: 0 };
    await Wallet.create(dataWallet);

    res.status(201).json({ success: "Usuario creado con exito!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

user.get("/users", async (req, res) => {
  try {
    const response = await User.findAll({ include: { model: Wallet } });
    res.json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = user;
