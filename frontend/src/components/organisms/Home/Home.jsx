import "./Home.scss";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";

function Home() {
  const { logedUser } = useSelector((state) => state.user);
  const { allCoins } = useSelector((state) => state.crypto);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoins());
    dispatch(setLogedUser(JSON.parse(localStorage.getItem("logedUser"))));
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio
  }, [dispatch, navigate]);

  function coinData(name, type) {
    if (allCoins.length) {
      const findCoin = allCoins.find((coin) => coin.name === name);
      console.log(findCoin);
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
      <section className="btns_container">
        <Button
          color="primary"
          variant="outlined"
          onClick={() => console.log(logedUser)}
        >
          Ingresar dinero
        </Button>
        <Button color="success" variant="contained">
          INVERTIR
        </Button>
        <Button color="error" variant="outlined">
          Retirar dinero
        </Button>
      </section>

      <Card elevation={4}>
        <CardContent className="card_saldo">
          <Typography>Saldo disponible: $000</Typography>
          <Typography>Mis inversiones: $000</Typography>
          <Typography>Total: $000</Typography>
        </CardContent>
      </Card>

      <Card sx={{ margin: "1rem 0" }} elevation={4} className="card_portfolio">
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
              {logedUser.Wallet &&
                logedUser.Wallet.TradingCoins.map((coin) => (
                  // TODO crear nuevo componente

                  <TableRow key={coin.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/coin/${coin.name.toLowerCase()}`}>
                        {coin.symbol.toUpperCase()}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      {coin.amount.toFixed(8)}
                    </TableCell>
                    <TableCell align="center">
                      $
                      {new Intl.NumberFormat().format(
                        coinData(coin.name, "price")
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {coinData(coin.name, "%day")?.toFixed(2)}%
                    </TableCell>
                    <TableCell align="center">
                      ${coinData(coin.name, "$day")?.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">${coin.ppc.toFixed(0)}</TableCell>
                    <TableCell align="center">porcentaje ganancia %</TableCell>
                    <TableCell align="center">
                      ${" "}
                      {/* TODO crear para model investmentAmount ($ total invertido) */}
                    </TableCell>
                    <TableCell align="center">
                      $
                      {(coin.amount * coinData(coin.name, "price"))?.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </main>
  );
}

export default Home;
