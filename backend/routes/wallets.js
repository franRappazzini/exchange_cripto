const { Router } = require("express");
const { Wallet } = require("../db");
const wallet = Router();

wallet.put("/wallet/:id", async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  console.log(amount);

  try {
    const response = await Wallet.findByPk(id);
    response.availableMoney += parseFloat(amount);
    await response.save();

    res.status(201).json({ success: "Saldo modificado con exito!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = wallet;
