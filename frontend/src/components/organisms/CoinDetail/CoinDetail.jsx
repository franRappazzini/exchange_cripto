import "./CoinDetail.scss";

import { Breadcrumbs, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdvancedChartInfo from "../../molecules/AdvancedChartInfo/AdvancedChartInfo";
import CoinAdvancedDetails from "../../molecules/CoinAdvancedDetails/CoinAdvancedDetails";
import Header from "../../molecules/Header/Header";
import ModalsContainer from "../../molecules/ModalsContainer/ModalsContainer";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";

function CoinDetail() {
  const [modals, setModals] = useState({ buy: false, sell: false });

  const { idCoin } = useParams();
  const { allCoins } = useSelector((state) => state.crypto);
  const coin = allCoins.find((coin) => coin.id === idCoin) || {};
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoins());
    localUser.id && dispatch(setLogedUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("coinDetail");
  }, [dispatch, localUser.id, navigate]);

  return (
    <>
      <Header />

      <main className="coin-detail_component">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb_container">
          <Link to="/coins">Coins</Link>
          <Typography color="text.secondary">{coin?.name}</Typography>
        </Breadcrumbs>

        {Object.keys(coin).length > 0 ? (
          <>
            <CoinAdvancedDetails
              coin={coin}
              modals={modals}
              setModals={setModals}
            />

            <AdvancedChartInfo coin={coin} />

            <ModalsContainer
              modals={modals}
              setModals={setModals}
              coin={coin}
            />
          </>
        ) : (
          <div className="loader_container">
            <CircularProgress />
          </div>
        )}
      </main>
    </>
  );
}

export default CoinDetail;
