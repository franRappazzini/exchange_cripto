import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
import { tradingCoins } from "../../../redux/actions/cryptoActions";
import { useState } from "react";

function ModalVenta({ modals, handleClose, coin, logedUser, updateUser }) {
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState(false);
  const { id, name, current_price, image, symbol } = coin;
  const walletId = logedUser.Wallet.id;

  async function handleTrading() {
    if (current_price * amount < 1) return;
    if (coinAmount() < amount) return;

    const newTrading = {
      name,
      symbol,
      image,
      amount: -amount,
      investmentAmount: -(amount * current_price),
      ppc: current_price, // TODO sacar, porque en venta creo que no cambiaria
      WalletId: walletId,
    };

    const res = await tradingCoins(newTrading);
    if (res) return;
    else {
      updateUser();
      showAlert();
    }
  }

  function coinAmount() {
    if (logedUser.Wallet && logedUser.Wallet.TradingCoins.length > 0) {
      const findCoin = logedUser.Wallet.TradingCoins.find(
        (coin) => coin.name === name
      );

      return findCoin ? parseFloat(findCoin.amount).toFixed(8) : 0;
    } else return 0;
  }

  function showAlert() {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      handleClose();
    }, 2500);
  }

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={modals}
        maxWidth="sm"
        fullWidth="100%"
      >
        <DialogContent dividers>
          {alert && (
            <Alert variant="outlined" severity="success">
              {amount} {symbol.toUpperCase()} vendido!
            </Alert>
          )}
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
              <Typography gutterBottom>Monedas disponibles:</Typography>
              <Typography gutterBottom>
                {coinAmount()} {symbol.toUpperCase()}
              </Typography>
            </div>
            <TextField
              id="outlined-basic"
              label="Cantidad a vender"
              variant="outlined"
              type="number"
              size="small"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              error={coinAmount() < amount ? true : false}
              helperText={
                coinAmount() < amount
                  ? "Cantidad insuficiente"
                  : "*Recibir min $1"
              }
              sx={{ m: "1rem 0", width: "100%" }}
              autoFocus
            />

            <div>
              <Typography gutterBottom>Recibire:</Typography>
              <Typography gutterBottom>
                ${new Intl.NumberFormat().format(current_price * amount)}{" "}
              </Typography>
            </div>

            <div className="btns_container">
              <Button
                variant="contained"
                color="error"
                onClick={handleTrading}
                disabled={current_price * amount < 1 ? true : false}
              >
                Vender
              </Button>
              <Button color="error" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalVenta;
