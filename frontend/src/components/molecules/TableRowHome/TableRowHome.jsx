import { TableCell, TableRow } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

function TableRowHome({ coin, coinData }) {
  return (
    <TableRow key={coin.id}>
      <TableCell component="th" scope="row">
        <Link to={`/coin/${coin.name.toLowerCase()}`}>
          {coin.symbol.toUpperCase()}
        </Link>
      </TableCell>
      <TableCell align="center">{coin.amount.toFixed(8)}</TableCell>
      <TableCell align="center">
        ${new Intl.NumberFormat().format(coinData(coin.name, "price"))}
      </TableCell>
      <TableCell align="center">
        {coinData(coin.name, "%day")?.toFixed(2)}%
      </TableCell>
      <TableCell align="center">
        ${coinData(coin.name, "$day")?.toFixed(2)}
      </TableCell>
      <TableCell align="center">
        ${new Intl.NumberFormat().format(coin.ppc.toFixed(0))}
      </TableCell>
      <TableCell align="center">
        {(
          (coin.amount * coinData(coin.name, "price") * 100) /
            coin.investmentAmount -
          100
        ).toFixed(2)}
        %
      </TableCell>
      <TableCell align="center">
        $
        {(
          (coinData(coin.name, "price") * coin.investmentAmount) / coin.ppc -
          coin.investmentAmount
        ).toFixed(2)}
      </TableCell>
      <TableCell align="center">
        ${(coin.amount * coinData(coin.name, "price"))?.toFixed(2)}
      </TableCell>
    </TableRow>
  );
}

export default TableRowHome;
