import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

import React from "react";
import { createUser } from "../../../redux/actions/userActions";

function FormSignUp({ newUser, setNewUser }) {
  async function handleSubmit(e) {
    e.preventDefault();

    if (validate()) return;

    const res = await createUser(newUser);
    // TODO crear modal para esto
    if (res) {
      console.log(res.response.data.error);
      alert(res.response.data.error);
    } else {
      console.log(res);
      alert("ok");
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

  return (
    <Card sx={{ p: "2rem" }} className="card_sign-in">
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
      </CardContent>
    </Card>
  );
}

export default FormSignUp;
