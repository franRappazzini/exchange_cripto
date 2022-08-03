import "./Home.scss";

import {
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AvailableBalance from "../../molecules/AvailableBalance/AvailableBalance";
import MoneyBtns from "../../molecules/MoneyBtns/MoneyBtns";
import React from "react";
import TableRowHome from "../../molecules/TableRowHome/TableRowHome";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { logedUser } = useSelector((state) => state.user);
  const { allCoins } = useSelector((state) => state.crypto);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoins());
    localUser.id && dispatch(setLogedUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("home");
  }, [dispatch, navigate, localUser.id]);

  function coinData(name, type) {
    if (allCoins.length) {
      const findCoin = allCoins.find((coin) => coin.name === name);
      if (findCoin) {
        switch (type) {
          case "price":
            return findCoin.current_price;
          case "%day":
            return findCoin.price_change_percentage_24h;
          case "$day":
            return findCoin.price_change_24h;
          default:
            break;
        }
      }
    }
  }

  return (
    <main className="home_component">
      <MoneyBtns />

      <AvailableBalance logedUser={logedUser} coinData={coinData} />

      {logedUser.Wallet && logedUser.Wallet.TradingCoins.length > 0 && (
        <Card
          sx={{ margin: "1rem 0" }}
          elevation={4}
          className="card_portfolio"
        >
          <CardHeader title="Portfolio" />
          <TableContainer component={Paper} elevation={4}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>Coin</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Ultimo precio</TableCell>
                  <TableCell align="center">Var. diaria %</TableCell>
                  <TableCell align="center">Var. diaria $</TableCell>
                  <TableCell align="center">PPC</TableCell>
                  <TableCell align="center">Gan-Per %</TableCell>
                  <TableCell align="center">Gan-Per $</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logedUser.Wallet.TradingCoins.map((coin) => (
                  <TableRowHome key={coin.id} coin={coin} coinData={coinData} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </main>
  );
}

export default Home;
