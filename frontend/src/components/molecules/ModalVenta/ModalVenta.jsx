import {
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

function ModalVenta({ modals, handleClose, coin }) {
  const [amount, setAmount] = useState("");
  const { id, name, current_price, image, symbol } = coin;

  async function handleTrading() {
    if (current_price * amount < 1) return;

    const newTrading = {
      name,
      symbol,
      image,
      amount: -amount,
      investmentAmount: -(amount * current_price),
      ppc: current_price, // TODO sacar, porque en venta creo que no cambiaria
      WalletId: "1",
    };

    const res = await tradingCoins(newTrading);
    if (res) return alert(res.message);
    else {
      setAmount("");
      alert("todo ok");
      handleClose();
    }
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
          <section className="coin_container">
            <div>
              <img src={image} alt={id} width={60} />
              <h1>{name}</h1>
            </div>

            <div className="mas-info_container">
              <p>${new Intl.NumberFormat().format(current_price)}</p>
              <Link to={`/coin/${id}`}>Ver mas info.</Link>
            </div>
          </section>

          <section className="compra_container">
            <div>
              <Typography gutterBottom>Monedas disponibles:</Typography>
              <Typography gutterBottom>000 {symbol.toUpperCase()}</Typography>
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
              //   error={amount > cantDisponibleCripto() || cantidad < 0}
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
                // TODO aclarar min de venta $1
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
