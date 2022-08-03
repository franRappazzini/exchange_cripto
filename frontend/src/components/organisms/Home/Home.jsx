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
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import TableRowHome from "../../molecules/TableRowHome/TableRowHome";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { getUser } from "../../../redux/actions/userActions";
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
    localUser.id && dispatch(getUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("home");
  }, [dispatch, navigate, localUser.id]);

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
          <Typography>
            Saldo disponible: $
            {new Intl.NumberFormat().format(logedUser.Wallet?.availableMoney)}
          </Typography>
          <Typography>
            {/* TODO ir sumando/restando a la wallet a medida que compre/venda ???? */}
            Mis inversiones: $
            {new Intl.NumberFormat().format(totalInvestments())}
          </Typography>
          <Typography>
            Total: $
            {new Intl.NumberFormat().format(
              logedUser.Wallet?.availableMoney + totalInvestments()
            )}
          </Typography>
        </CardContent>
      </Card>

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
