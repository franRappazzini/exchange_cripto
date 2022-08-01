import "./CoinDetail.scss";

import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AdvancedChart } from "react-tradingview-embed";
import React from "react";
import { StarOutline } from "@mui/icons-material";
import { getCoins } from "../../../redux/actions/cryptoActions";
import { useEffect } from "react";

function CoinDetail() {
  const { idCoin } = useParams();
  const { allCoins } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();
  const coin = allCoins.find((coin) => coin.id === idCoin) || {};

  useEffect(() => {
    dispatch(getCoins());

    console.log("coinDetail", coin);
  }, [dispatch]);

  function returnColor() {
    return coin.price_change_percentage_24h >= 0 ? "#8dc647" : "#e15241";
  }

  return (
    <main className="coin-detail_component">
      {Object.keys(coin).length > 0 && (
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
            <IconButton color="warning" aria-label="Favorito">
              <StarOutline />
            </IconButton>
          </div>

          <div className="second_div">
            <h1>${new Intl.NumberFormat().format(coin.current_price)}</h1>
            <span style={{ color: returnColor() }}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          <div className="third_div">
            <Button variant="text" size="small" color="success">
              Comprar
            </Button>

            <Button variant="text" size="small" color="error">
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
                  //   hide_side_toolbar: true,
                  //   hide_top_toolbar: true,
                  //   withdateranges: false,
                }}
              />
            </div>

            <Card elevation={4}>
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
        </>
      )}
    </main>
  );
}

export default CoinDetail;
