import "./ModalIngresoDinero.scss";

import {
  Button,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
} from "@mui/material";

import React from "react";
import { useState } from "react";

function ModalIngresoDinero({ modals, handleClose }) {
  const [amount, setAmount] = useState(1);

  // TODO conectar con el back

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
          error={amount < 1 ? true : false}
          helperText={"*Min $1"}
          sx={{ m: "1rem 0", width: "100%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <div className="btns_container">
          <Button
            variant="contained"
            color="success"
            // onClick={handleTrading}
            disabled={amount < 1}
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
