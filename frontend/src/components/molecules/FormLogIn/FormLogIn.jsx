import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

import React from "react";

function FormLogIn({ userLogIn, setUserLogIn }) {
  async function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setUserLogIn({ ...userLogIn, [e.target.name]: e.target.value });
  }

  return (
    <Card sx={{ p: "2rem" }} className="card_sign-in">
      <CardHeader title="Ingresar" sx={{ p: "0 0 1rem 0" }} />

      <CardContent>
        <form action="" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="filled"
            name="email"
            type="email"
            value={userLogIn.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            variant="filled"
            name="password"
            type="password"
            value={userLogIn.password}
            onChange={handleChange}
            required
          />

          <div>
            <Button variant="outlined" type="submit">
              Ingresar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormLogIn;
