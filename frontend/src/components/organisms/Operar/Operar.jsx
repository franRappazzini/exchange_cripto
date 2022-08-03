import "./Operar.scss";

import {
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

import TableRowCoin from "../../molecules/TableRowCoin/TableRowCoin";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { getUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Operar() {
  const { allCoins } = useSelector((state) => state.crypto);
  const coins = allCoins.length > 0 ? allCoins : [];
  const [page, setPage] = useState(1);
  const coinsPerPage = 20;
  const totalPage = Math.ceil(coins.length / coinsPerPage);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoins());
    localUser.id && dispatch(getUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("operar");
  }, [dispatch, navigate, localUser.id]);

  return (
    <main className="operar_component">
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
                {coins
                  .slice(
                    (page - 1) * coinsPerPage,
                    (page - 1) * coinsPerPage + coinsPerPage
                  )
                  .map((coin) => (
                    <TableRowCoin key={coin.id} coin={coin} />
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
