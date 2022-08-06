import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { getAllUsers, setLogedUser } from "../../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { hash } from "../../../utils/functions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FormLogIn({ userLogIn, setUserLogIn }) {
  const [alert, setAlert] = useState(false);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const allUsers = users.length > 0 ? users : [];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (allUsers.length) {
      const hashedPass = await hash(userLogIn.password);
      const user = allUsers.find(
        (u) => u.email === userLogIn.email && u.password === hashedPass
      );

      if (user) {
        dispatch(setLogedUser(user));
        localStorage.setItem("logedUser", JSON.stringify(user));
        setUserLogIn({ email: "", password: "" });
        navigate("/home");
      } else showAlert();
    }
  }

  function handleChange(e) {
    setUserLogIn({ ...userLogIn, [e.target.name]: e.target.value });
  }

  function showAlert() {
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  return (
    <Card sx={{ p: "2rem", height: "fit-content" }} className="card_log-in">
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
            className="input"
          />

          <TextField
            label="Contraseña"
            variant="filled"
            name="password"
            type="password"
            value={userLogIn.password}
            onChange={handleChange}
            required
            className="input"
          />

          <div>
            <Button variant="outlined" type="submit">
              Ingresar
            </Button>
          </div>
        </form>
        {alert && (
          <Alert className="alert_log-in" severity="warning">
            Email y/o contraseña incorrectas, por favor vuelva a intentar
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default FormLogIn;
