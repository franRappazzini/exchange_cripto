import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { moneyTransfer } from "../../../redux/actions/walletActions";

function ModalRetiroDinero({ modals, handleClose, logedUser, updateUser }) {
  const [amount, setAmount] = useState(1);
  const [alert, setAlert] = useState(false);
  const { id, availableMoney } = logedUser.Wallet;

  async function handleWithdraw() {
    if (amount < 1 || amount > availableMoney) return;

    const res = await moneyTransfer(id, parseFloat(-amount));
    if (res) return;
    else {
      updateUser();
      showAlert();
    }
  }

  function showAlert() {
    setAlert(true);
    setAmount(1);
    setTimeout(() => {
      setAlert(false);
      handleClose();
    }, 2500);
  }

  return (
    <Dialog
      onClose={handleClose}
      open={modals.withdrawal}
      maxWidth="sm"
      fullWidth="100%"
      className="modal-ingreso_component"
    >
      <DialogContent dividers>
        {alert && (
          <Alert variant="outlined" severity="success">
            Retiro exitoso!
          </Alert>
        )}
        <h1>Retirar dinero</h1>

        <TextField
          id="outlined-basic"
          label="Cantidad"
          variant="outlined"
          type="number"
          size="small"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoComplete="off"
          error={amount < 1 || amount > availableMoney}
          helperText={
            (amount > availableMoney && "Saldo no disponible") || "*Min $1"
          }
          sx={{ m: "1rem 0", width: "100%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <div className="btns_container">
          <Button
            variant="contained"
            onClick={handleWithdraw}
            disabled={amount < 1 || amount > availableMoney}
          >
            Retirar
          </Button>
          <Button color="error" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalRetiroDinero;
