import "./ModalIngresoDinero.scss";

import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from "@mui/material";

import React from "react";
import { depositMoney } from "../../../redux/actions/walletActions";
import { useState } from "react";

function ModalIngresoDinero({ modals, handleClose, logedUser, updateUser }) {
  const [amount, setAmount] = useState(1);
  const walletId = logedUser.Wallet.id;

  // TODO conectar con el back

  async function handleDeposit() {
    if (amount < 1 || amount > 10000) return;

    const res = await depositMoney(walletId, amount);

    if (res) alert(res.message);
    else {
      updateUser();
      alert("ingreso ok");
      handleClose();
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      open={modals.income}
      maxWidth="sm"
      fullWidth="100%"
      className="modal-ingreso_component"
    >
      <DialogContent dividers>
        <h1>Ingresar dinero</h1>

        <TextField
          id="outlined-basic"
          label="Cantidad"
          variant="outlined"
          type="number"
          size="small"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoComplete="off"
          error={amount < 1 || amount > 10000}
          helperText={"*Min $1 / max $10.000"}
          sx={{ m: "1rem 0", width: "100%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <div className="btns_container">
          <Button
            variant="contained"
            color="success"
            onClick={handleDeposit}
            disabled={amount < 1 || amount > 10000}
          >
            Ingresar
          </Button>
          <Button color="error" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalIngresoDinero;
