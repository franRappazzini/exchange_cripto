const { Router } = require("express");
const { TradingCoin } = require("../db");
const coins = Router();

coins.post("/coins", async (req, res) => {
  const { name, symbol, image, amount, ppc, WalletId } = req.body;

  try {
    const [coin, created] = await TradingCoin.findOrCreate({
      where: { name },
      defaults: { symbol, image, amount, ppc, WalletId },
    });

    if (!created) {
      coin.amount += amount;
      amount > 0 && (coin.ppc = (coin.ppc + ppc) / 2);
      coin.save();
    }

    res.status(201).json({ success: "Operado con exito!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = coins;
