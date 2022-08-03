import { Button, IconButton } from "@mui/material";
import { Star, StarOutline } from "@mui/icons-material";
import {
  addFavoriteCoin,
  removeFavoriteCoin,
} from "../../../redux/actions/cryptoActions";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

function CoinAdvancedDetails({ coin, modals, setModals }) {
  const localFavs = JSON.parse(localStorage.getItem("coinsFavorites"));
  const { favorites } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  function returnColor() {
    return coin.price_change_percentage_24h >= 0 ? "#8dc647" : "#e15241";
  }

  function handleAddFav(coin) {
    dispatch(addFavoriteCoin(coin));
    const favs = JSON.stringify([...favorites, coin]);
    localStorage.setItem("coinsFavorites", favs);
  }

  function handleRemoveFav(coin) {
    dispatch(removeFavoriteCoin(coin));
    const favFilter = localFavs.filter((c) => c.name !== coin.name);
    localStorage.setItem("coinsFavorites", JSON.stringify(favFilter));
  }

  function isFavorite() {
    if (localFavs && localFavs.length) {
      return localFavs.find((c) => c.name === coin.name) ? true : false;
    }
  }

  return (
    <>
      <div className="first_div">
        <img src={coin.image} alt={`${coin.name}`} className="coin_image" />
        <h3>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h3>
        {isFavorite() ? (
          <IconButton
            color="warning"
            aria-label="Quitar favorito"
            onClick={() => handleRemoveFav(coin)}
          >
            <Star />
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
    </>
  );
}

export default CoinAdvancedDetails;
