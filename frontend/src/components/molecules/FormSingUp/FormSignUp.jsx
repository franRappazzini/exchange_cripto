import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { createUser, getAllUsers } from "../../../redux/actions/userActions";

import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";

function FormSignUp({ newUser, setNewUser, setOption }) {
  const [alerts, setAlerts] = useState({
    error: false,
    success: false,
    text: "",
  });
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) return;

    const res = await createUser(newUser);
    console.log(res);
    if (res) showAlert(true, false, res.response.data.error);
    else {
      dispatch(getAllUsers());
      setNewUser({ name: "", lastName: "", email: "", password: "" });
      showAlert(false, true, "Usuario creado con exito!");
    }
  }

  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function validate() {
    const { name, lastName, email, password } = newUser;
    // const validatePass = new RegExp(
    //   "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    // );
    if (!name.match(/^[a-zA-Z\s]*$/)) {
      showAlert(true, false, "El nombre solo debe contener letras");
      return true;
    } else if (!lastName.match(/^[a-zA-Z\s]*$/)) {
      showAlert(true, false, "El apellido solo debe contener letras");
      return true;
    } else if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      showAlert(true, false, "El email debe tener formato de email");
      return true;
    } else if (!password.length > 0) {
      // no lo dejo para facilitar al user
      // else if (!password.match(validatePass)) {
      const text =
        "La contraseña debe ser mayor a 8 caracteres, contener al menos una letra mayuscula, una letra minuscula, un numero y un simbolo";
      showAlert(true, false, text);
      return true;
    }
  }

  function showAlert(error, success, text) {
    setAlerts({ error, success, text });

    setTimeout(() => {
      if (success) setOption("logIn");
      setAlerts({ error: false, success: false, text: "" });
    }, 3000);
  }

  return (
    <Card sx={{ p: "2rem" }} className="card_sign-up">
      <CardHeader title="Registrarse" sx={{ p: "0 0 1rem 0" }} />

      <CardContent>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Nombres"
            variant="filled"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellidos"
            variant="filled"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Constraseña"
            variant="filled"
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          />

          <div>
            <Button variant="outlined" type="submit">
              Crear
            </Button>
          </div>
        </form>

        {(alerts.error || alerts.success) && (
          <Alert
            className="alert_log-in"
            severity={alerts.success ? "success" : "warning"}
          >
            {alerts.text}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default FormSignUp;
