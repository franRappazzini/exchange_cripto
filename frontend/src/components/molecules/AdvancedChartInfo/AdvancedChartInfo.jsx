import "./AdvancedChartInfo.scss";

import { Card, CardContent, CardHeader } from "@mui/material";

import { AdvancedChart } from "react-tradingview-embed";
import CoinConverter from "../CoinConverter/CoinConverter";
import React from "react";

function AdvancedChartInfo({ coin }) {
  return (
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

      <div className="details_container">
        <CoinConverter coin={coin} />

        <Card elevation={4} className="card_container">
          <CardHeader
            title={`Estadisticas de precio (${coin.symbol.toUpperCase()})`}
          />
          <CardContent className="card-content_container">
            <div>
              <span className="span_grey">Precio</span>
              <span className="span_number">
                ${new Intl.NumberFormat().format(coin.current_price.toFixed(2))}
              </span>
            </div>
            <div>
              <span className="span_grey">24h Min / 24h Max</span>
              <span className="span_number">
                ${new Intl.NumberFormat().format(coin.low_24h.toFixed(2))} / $
                {new Intl.NumberFormat().format(coin.high_24h.toFixed(2))}
              </span>
            </div>
            <div>
              <span className="span_grey">Trading Vol</span>
              <span className="span_number">
                ${new Intl.NumberFormat().format(coin.total_volume.toFixed(2))}
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
                ${new Intl.NumberFormat().format(coin.market_cap.toFixed(2))}
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
      </div>
    </section>
  );
}

export default AdvancedChartInfo;
