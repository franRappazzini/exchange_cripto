import "./CoinConverter.scss";

import {
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import React from "react";
import { useState } from "react";

function CoinConverter({ coin }) {
  const [inputs, setInputs] = useState({ coin: "", usd: "" });

  function handleChangeCoin(e) {
    setInputs({
      coin: e.target.value,
      usd: (e.target.value * coin.current_price).toFixed(2),
    });
  }

  function handleChangeUsd(e) {
    setInputs({
      usd: e.target.value,
      coin: (e.target.value / coin.current_price).toFixed(8),
    });
  }

  return (
    <Card elevation={4}>
      <CardHeader title={`Convertir de ${coin.symbol.toUpperCase()} a USD`} />
      <CardContent className="converter_component">
        <OutlinedInput
          id="outlined-adornment-weight"
          startAdornment={
            <InputAdornment position="start">
              {coin.symbol.toUpperCase()}
            </InputAdornment>
          }
          type="number"
          name="coin"
          value={inputs.coin}
          onChange={handleChangeCoin}
        />
        <OutlinedInput
          id="outlined-adornment-weight"
          startAdornment={<InputAdornment position="start">USD</InputAdornment>}
          type="number"
          name="usd"
          value={inputs.usd}
          onChange={handleChangeUsd}
        />
      </CardContent>
    </Card>
  );
}

export default CoinConverter;
