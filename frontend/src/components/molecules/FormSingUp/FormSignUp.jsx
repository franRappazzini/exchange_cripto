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
  const [alert, setAlert] = useState({ error: false, success: false });
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) return;

    const res = await createUser(newUser);
    // TODO crear modal para esto
    if (res) showAlert("error");
    else {
      // console.log(res);
      // alert("ok");
      // setOption("logIn");

      dispatch(getAllUsers());
      setNewUser({ name: "", lastName: "", email: "", password: "" });
      showAlert("success");
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
    if (!name.match(/^[A-Za-z]+$/)) {
      alert("error en name");
      return true;
    } else if (!lastName.match(/^[A-Za-z]+$/)) {
      alert("error en lastName");
      return true;
    } else if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      alert("error en email");
      return true;
    } else if (!password.length > 0) {
      // no lo dejo para facilitar al user
      // else if (!password.match(validatePass)) {
      alert("error en password");
      return true;
    }
  }

  function showAlert(type) {
    setAlert({ ...alert, [type]: true });

    setTimeout(() => {
      if (alert.success) setOption("logIn"); // TODO ver esto que no lo toma
      setAlert({ error: false, success: false });
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

        {(alert.error || alert.success) && (
          <Alert
            className="alert_log-in"
            severity={alert.success ? "success" : "warning"}
          >
            {alert.success
              ? "Usuario creado con exito!"
              : "Error al crear el usuario"}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default FormSignUp;
