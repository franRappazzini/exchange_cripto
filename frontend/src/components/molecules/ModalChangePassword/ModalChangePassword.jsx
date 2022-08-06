import "./ModalChangePassword.scss";

import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import React from "react";
import { changePassword } from "../../../redux/actions/userActions";
import { hash } from "../../../utils/functions";
import { useState } from "react";

function ModalChangePassword({ modal, setModal, id, password, updateUser }) {
  const [alerts, setAlerts] = useState({
    error: false,
    success: false,
    text: "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [showPassword, setShowPassword] = useState(false);

  async function handleChangePassword() {
    const currentPassword = await hash(passwords.current);
    // no hago validacion de password para que sea mas facil al user
    if (!(currentPassword === password) || passwords.new === "") {
      return showAlert(true, false, "La contrseña actual es incorrecta");
    }

    const res = await changePassword(id, passwords.new);
    if (res) showAlert(true, false, "Error");
    else {
      updateUser();
      showAlert(false, true, "Contrseña cambiada con exito!");
    }
  }

  function handleClose() {
    setModal(false);
  }

  function handleChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function showAlert(error, success, text) {
    setAlerts({ error, success, text });

    setTimeout(() => {
      if (success) {
        setModal(false);
        setPasswords({ current: "", new: "" });
      }
      setAlerts({ error: false, success: false, text: "" });
    }, 2000);
  }

  return (
    <Dialog
      onClose={handleClose}
      open={modal}
      maxWidth="sm"
      fullWidth="100%"
      className="modal-password_component"
    >
      <DialogContent dividers>
        {(alerts.error || alerts.success) && (
          <Alert
            variant="outlined"
            severity={alerts.error ? "warning" : "success"}
          >
            {alerts.text}
          </Alert>
        )}
        <h1>Cambiar contraseña</h1>

        <section className="inputs_container">
          <TextField
            id="filled-basic"
            label="Contraseña actual"
            variant="filled"
            autoComplete="off"
            type="password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            required
          />
          <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Contraseña nueva
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              name="new"
              value={passwords.new}
              onChange={handleChange}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="btns_container">
            <Button variant="outlined" onClick={handleChangePassword}>
              Cambiar
            </Button>
            <Button variant="text" color="error" onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default ModalChangePassword;
