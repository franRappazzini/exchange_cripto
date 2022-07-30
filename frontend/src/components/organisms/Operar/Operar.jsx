import "./Operar.scss";

import {
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { useEffect } from "react";

function Operar() {
  const { allCoins } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const coins = allCoins.length > 0 ? allCoins : [];
  const [page, setPage] = useState(1);
  const coinsPerPage = 20;
  const totalPage = Math.ceil(coins.length / coinsPerPage);

  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  return (
    <main className="operar_component">
      {/* TODO hacer paginado */}

      {coins.length > 0 ? (
        <>
          <TableContainer component={Paper} elevation={4}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                    Coin
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    Precio
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    1h
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    24h
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    7d
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    24h volumen
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                    align="right"
                  >
                    Market cap
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* TODO esto otro componente */}
                {coins
                  .slice(
                    (page - 1) * coinsPerPage,
                    (page - 1) * coinsPerPage + coinsPerPage
                  )
                  .map((coin) => (
                    <TableRow key={coin.id}>
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
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </TableCell>
                      <TableCell align="right">
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </TableCell>
                      <TableCell align="right">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
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
                          //   onClick={() => setOpen(true)}
                        >
                          Comprar
                        </Button>
                        <Button
                          color="error"
                          size="small"
                          //   onClick={() => setOpenVenta(true)}
                        >
                          Vender
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="pagination_container">
            <Pagination
              count={totalPage}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </div>
        </>
      ) : (
        <div className="loader_container">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}

export default Operar;
