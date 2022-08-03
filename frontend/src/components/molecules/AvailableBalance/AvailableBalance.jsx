import { Card, CardContent, Tooltip, Typography } from "@mui/material";

import { Info } from "@mui/icons-material";
import React from "react";

function AvailableBalance({ logedUser, coinData }) {
  function totalInvestments() {
    if (logedUser.Wallet && logedUser.Wallet.TradingCoins) {
      let investments = 0;
      logedUser.Wallet.TradingCoins.forEach(
        (coin) =>
          (investments =
            investments +
            (coin.investmentAmount * coinData(coin.name, "price")) / coin.ppc)
      );

      return parseFloat(investments.toFixed(2));
    } else return 0;
  }

  return (
    <Card elevation={4}>
      <CardContent className="card_saldo">
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Saldo disponible: $
          {new Intl.NumberFormat().format(logedUser.Wallet?.availableMoney)}
          <Tooltip
            title="Dinero disponible para comprar criptos o retirar"
            arrow
          >
            <Info
              sx={{
                color: "lightgrey",
                marginLeft: "0.5rem",
                cursor: "pointer",
              }}
              fontSize="5"
            />
          </Tooltip>
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          {/* TODO ir sumando/restando a la wallet a medida que compre/venda ???? */}
          Mis inversiones: ${new Intl.NumberFormat().format(totalInvestments())}
          <Tooltip title="Dinero invertido total" arrow>
            <Info
              sx={{
                color: "lightgrey",
                marginLeft: "0.5rem",
                cursor: "pointer",
              }}
              fontSize="5"
            />
          </Tooltip>
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          Total: $
          {new Intl.NumberFormat().format(
            logedUser.Wallet?.availableMoney + totalInvestments()
          )}
          <Tooltip
            title="Dinero total (saldo disponible + dinero invertido)"
            arrow
          >
            <Info
              sx={{
                color: "lightgrey",
                marginLeft: "0.5rem",
                cursor: "pointer",
              }}
              fontSize="5"
            />
          </Tooltip>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AvailableBalance;
