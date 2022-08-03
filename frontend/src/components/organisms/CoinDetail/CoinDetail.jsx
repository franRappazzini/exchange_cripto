import "./CoinDetail.scss";

import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addFavoriteCoin,
  getCoins,
  removeFavoriteCoin,
} from "../../../redux/actions/cryptoActions";
import { useDispatch, useSelector } from "react-redux";

import { AdvancedChart } from "react-tradingview-embed";
import ModalsContainer from "../../molecules/ModalsContainer/ModalsContainer";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { StarOutline } from "@mui/icons-material";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useEffect } from "react";
import { useState } from "react";

function CoinDetail() {
  const [modals, setModals] = useState({ buy: false, sell: false });
  const [fav, setFav] = useState(false);
  const { idCoin } = useParams();
  const { allCoins, favorites } = useSelector((state) => state.crypto);
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

  function handleAddFav(coin) {
    dispatch(addFavoriteCoin(coin));
    const favs = JSON.stringify([...favorites, coin]);
    localStorage.setItem("coinsFavorites", favs);
    setFav(true);
  }

  function handleRemoveFav(coin) {
    // TODO hacer logica para dejar el btn pulsado
    dispatch(removeFavoriteCoin(coin));
    let favLocal = JSON.parse(localStorage.getItem("coinsFavorites"));
    favLocal = favLocal.filter((c) => c.name !== coin.name);
    localStorage.setItem("coinsFavorites", JSON.stringify(favLocal));
    setFav(false);
  }

  function returnColor() {
    return coin.price_change_percentage_24h >= 0 ? "#8dc647" : "#e15241";
  }

  // TODO ver como reducir este componente (crear container)
  return (
    <main className="coin-detail_component">
      {Object.keys(coin).length > 0 ? (
        <>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumb_container">
            <Link to="/operar">Coins</Link>
            <Typography color="text.secondary">{coin.name}</Typography>
          </Breadcrumbs>

          <div className="first_div">
            <img src={coin.image} alt={`${coin.name}`} className="coin_image" />
            <h3>
              {coin.name} ({coin.symbol.toUpperCase()})
            </h3>
            {fav ? (
              <IconButton
                color="warning"
                aria-label="Quitar favorito"
                onClick={() => handleRemoveFav(coin)}
              >
                <StarIcon />
              </IconButton>
            ) : (
              <IconButton
                color="warning"
                aria-label="Favorito"
                onClick={() => handleAddFav(coin)}
              >
                <StarOutline />
              </IconButton>
            )}
          </div>

          <div className="second_div">
            <h1>${new Intl.NumberFormat().format(coin.current_price)}</h1>
            <span style={{ color: returnColor() }}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          <div className="third_div">
            <Button
              variant="text"
              size="small"
              color="success"
              onClick={() => setModals({ ...modals, buy: true })}
            >
              Comprar
            </Button>

            <Button
              variant="text"
              size="small"
              color="error"
              onClick={() => setModals({ ...modals, sell: true })}
            >
              Vender
            </Button>
          </div>

          {/* TODO aca hacer un conversor como coingecko */}
          <section className="more-details_coin">
            <section>
              <div>
                <span className="span_grey">Market Cap</span>
                <span className="span_number">
                  ${new Intl.NumberFormat().format(coin.market_cap)}
                </span>
              </div>
              <div>
                <span className="span_grey">24h Vol</span>
                <span className="span_number">
                  ${new Intl.NumberFormat().format(coin.total_volume)}
                </span>
              </div>
            </section>
            <section>
              <div>
                <span className="span_grey">Supply Circulante</span>
                <span className="span_number">
                  {new Intl.NumberFormat().format(coin.circulating_supply)}
                </span>
              </div>
              <div>
                <span className="span_grey">Supply Total</span>
                <span className="span_number">
                  {new Intl.NumberFormat().format(coin.total_supply)}
                </span>
              </div>
            </section>
          </section>

          <section className="more-info_container">
            <div>
              <AdvancedChart
                widgetProps={{
                  symbol: `${coin.symbol}usd`,
                  allow_symbol_change: false,
                  interval: "60",
                  style: 1,
                  locale: "es",
                  range: "10d",
                  // TODO ver si sacarle esto en mobile
                  // hide_side_toolbar: true,
                  // hide_top_toolbar: true,
                  // withdateranges: false,
                }}
              />
            </div>

            <Card elevation={4} className="card_container">
              <CardHeader
                title={`Estadisticas de precio (${coin.symbol.toUpperCase()})`}
              />
              <CardContent className="card-content_container">
                <div>
                  <span className="span_grey">Precio</span>
                  <span className="span_number">
                    $
                    {new Intl.NumberFormat().format(
                      coin.current_price.toFixed(2)
                    )}
                  </span>
                </div>
                <div>
                  <span className="span_grey">24h Min / 24h Max</span>
                  <span className="span_number">
                    ${new Intl.NumberFormat().format(coin.low_24h.toFixed(2))} /
                    ${new Intl.NumberFormat().format(coin.high_24h.toFixed(2))}
                  </span>
                </div>
                <div>
                  <span className="span_grey">Trading Vol</span>
                  <span className="span_number">
                    $
                    {new Intl.NumberFormat().format(
                      coin.total_volume.toFixed(2)
                    )}
                  </span>
                </div>
                <div>
                  <span className="span_grey">Market Cap Rank</span>
                  <span className="span_number">
                    #
                    {new Intl.NumberFormat().format(
                      coin.market_cap_rank.toFixed(2)
                    )}
                  </span>
                </div>
                <div>
                  <span className="span_grey">Market Cap</span>
                  <span className="span_number">
                    $
                    {new Intl.NumberFormat().format(coin.market_cap.toFixed(2))}
                  </span>
                </div>
                <div>
                  <span className="span_grey">Vol / Market Cap</span>
                  <span className="span_number">
                    {new Intl.NumberFormat().format(
                      (coin.total_volume / coin.market_cap).toFixed(5)
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* modals, setModals, coin */}
          <ModalsContainer modals={modals} setModals={setModals} coin={coin} />
        </>
      ) : (
        <div className="loader_container">
          <CircularProgress />
        </div>
      )}
    </main>
  );
}

export default CoinDetail;
