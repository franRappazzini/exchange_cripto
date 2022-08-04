import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import ModalForCoin from "../ModalsContainer/ModalsContainer";

function TableRowCoin({ coin }) {
  const [modals, setModals] = useState({ buy: false, sell: false });

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {coin.market_cap_rank}
        </TableCell>
        <TableCell>
          <img src={coin.image} alt={coin.id} width={30} />
        </TableCell>
        <TableCell sx={{ fontWeight: 600 }}>
          <Link to={`/coin/${coin.id}`} className="link_name">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Link>
        </TableCell>
        <TableCell align="right">
          ${new Intl.NumberFormat().format(coin.current_price)}
        </TableCell>
        <TableCell align="right">
          {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
        </TableCell>
        <TableCell align="right">
          {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
        </TableCell>
        <TableCell align="right">
          {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
        </TableCell>
        <TableCell align="right">
          ${new Intl.NumberFormat().format(coin.total_volume)}
        </TableCell>
        <TableCell align="right">
          ${new Intl.NumberFormat().format(coin.market_cap)}
        </TableCell>
        <TableCell align="right">
          <Button
            color="success"
            size="small"
            onClick={() => setModals({ ...modals, buy: true })}
          >
            Comprar
          </Button>
          <Button
            color="error"
            size="small"
            onClick={() => setModals({ ...modals, sell: true })}
          >
            Vender
          </Button>
        </TableCell>
      </TableRow>

      {(modals.buy || modals.sell) && (
        <ModalForCoin modals={modals} setModals={setModals} coin={coin} />
      )}
    </>
  );
}

export default TableRowCoin;
