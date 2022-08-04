import "./ModalCompra.scss";

import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
import { tradingCoins } from "../../../redux/actions/cryptoActions";
import { useState } from "react";

function ModalCompra({ modals, handleClose, coin, logedUser, updateUser }) {
  const [amount, setAmount] = useState("");
  const { id, name, current_price, image, symbol } = coin;
  const availableMoney = logedUser.Wallet?.availableMoney;

  async function handleTrading() {
    if (amount < 10) return;
    if (availableMoney < amount) return;

    const newCoin = {
      name,
      symbol,
      image,
      amount: amount / current_price,
      investmentAmount: amount,
      ppc: current_price,
      WalletId: "1",
    };

    const res = await tradingCoins(newCoin);

    if (res) return alert(res.message);
    else {
      updateUser();
      // setAmount(0);
      alert("todo ok");
      handleClose();
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={modals.buy}
      maxWidth="sm"
      fullWidth="100%"
    >
      <DialogContent dividers>
        <section className="coin_container">
          <div>
            <img src={image} alt={id} width={60} />
            <h1>{name}</h1>
          </div>

          <div className="mas-info_container">
            <p>${new Intl.NumberFormat().format(current_price)}</p>
            <Link to={`/coin/${id}`} onClick={handleClose}>
              Ver mas info.
            </Link>
          </div>
        </section>

        <section className="compra_container">
          <div>
            <Typography gutterBottom>Saldo disponible:</Typography>
            <Typography gutterBottom>${availableMoney}</Typography>
          </div>
          <TextField
            id="outlined-basic"
            label="Cantidad"
            variant="outlined"
            type="number"
            size="small"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
            error={availableMoney < amount ? true : false}
            helperText={
              availableMoney < amount ? "Saldo insuficiente" : "*Min $10"
            }
            sx={{ m: "1rem 0", width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <div>
            <Typography gutterBottom>Recibire:</Typography>
            <Typography gutterBottom>
              {new Intl.NumberFormat().format(amount / current_price)}{" "}
              {symbol.toUpperCase()}
            </Typography>
          </div>

          <div className="btns_container">
            <Button
              variant="contained"
              color="success"
              onClick={handleTrading}
              disabled={amount < 10 || availableMoney < amount ? true : false}
            >
              Comprar
            </Button>
            <Button color="error" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCompra;
