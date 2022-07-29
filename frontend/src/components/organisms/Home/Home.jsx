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

import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
    <main className="home_component">
      <section className="btns_container">
        <Button color="primary" variant="outlined">
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

      <Card sx={{ margin: "1rem 0" }} elevation={4}>
        <CardHeader title="Portfolio" />
        <TableContainer component={Paper} elevation={4}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Ultimo precio</TableCell>
                <TableCell align="center">Var % diaria</TableCell>
                <TableCell align="center">Var $ diaria</TableCell>
                <TableCell align="center">PPC</TableCell>
                <TableCell align="center">Gan-Per %</TableCell>
                <TableCell align="center">Gan-Per $</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {criptos &&
                criptos.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell component="th" scope="row">
                      <Link
                        href={`https://www.coingecko.com/en/coins/${row.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="CoinGecko"
                      >
                        {row.symbol.toUpperCase()}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{row.cantidad}</TableCell>
                    <TableCell align="center">${row.ultimoPrecio}</TableCell>
                    <TableCell align="center">
                      {row.porcentajeDiario}%
                    </TableCell>
                    <TableCell align="center">${row.variacionDiario}</TableCell>
                    <TableCell align="center">
                      ${new Intl.NumberFormat().format(obtenerPPC(row.ppc))}
                    </TableCell>
                    <TableCell align="center">{row.porcentajeGan}%</TableCell>
                    <TableCell align="center">${row.variacionGan}</TableCell>
                    <TableCell align="center">${row.total}</TableCell>
                  </TableRow>
                ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </main>
  );
}

export default Home;
