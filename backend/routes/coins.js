const { Router } = require("express");
const { TradingCoin } = require("../db");
const coins = Router();

coins.post("/coins", async (req, res) => {
  const { name, symbol, image, amount, investmentAmount, ppc, WalletId } =
    req.body;

  try {
    const [coin, created] = await TradingCoin.findOrCreate({
      where: { name },
      defaults: { symbol, image, amount, ppc, investmentAmount, WalletId },
    });

    if (!created) {
      // si ya existe, actualizo los valores
      coin.amount += amount;
      amount > 0 && (coin.ppc = (coin.ppc + ppc) / 2);
      coin.investmentAmount += parseInt(investmentAmount);

      coin.amount === 0 ? await coin.destroy() : await coin.save();
    }

    // actualizamos el valor de la wallet
    const wallet = await coin.getWallet();
    wallet.availableMoney -= investmentAmount;
    await wallet.save();

    res.status(201).json({ success: "Operado con exito!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = coins;
