import "./Operar.scss";

import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableContainerOperar from "../../molecules/TableCointainerOperar/TableContainerOperar";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Operar() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const { allCoins, favorites } = useSelector((state) => state.crypto);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  // const localFavs = JSON.parse(localStorage.getItem("coinsFavorites")) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCoins());
    localUser.id && dispatch(setLogedUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("operar");
  }, [dispatch, navigate, localUser.id]);

  useEffect(() => {
    if (allCoins.length) setCoins(allCoins);
    if (allCoins.length && search !== "") {
      setCoins(
        allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    console.log("search");
  }, [allCoins, search]);

  return (
    <main className="operar_component">
      <section className="search_section">
        <TextField
          id="standard-basic"
          label="Buscar"
          variant="standard"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="btns_container">
          <Button variant="outlined">Todas</Button>
          <Button variant="outlined" color="warning">
            Favoritas
          </Button>
        </div>
      </section>

      {coins.length > 0 ? (
        <TableContainerOperar coins={coins} />
      ) : (
        <div className="loader_container">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}

export default Operar;
