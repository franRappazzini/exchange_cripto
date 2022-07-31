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
import { useState } from "react";

function ModalCompra({
  modals,
  handleClose,
  id,
  name,
  current_price,
  image,
  symbol,
}) {
  //   const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <>
      {/* <Button onClick={handleClickOpen}>open</Button> */}
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
              <Link to={`/coin/${id}`}>Ver mas info.</Link>
            </div>
          </section>

          <section className="compra_container">
            <div>
              <Typography gutterBottom>Saldo disponible:</Typography>
              <Typography gutterBottom>$000</Typography>
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
              //   error={cantidad > saldo || cantidad < 0}
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

            <Button variant="contained" color="success" onClick={handleClose}>
              Comprar
            </Button>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalCompra;
