import "./Header.scss";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import React from "react";

function Header({ setOption }) {
  const navigate = useNavigate();

  return (
    <header className="header_component">
      <Link to="/home">
        <h1>Header</h1>
      </Link>
      <div className="btn_container">
        <Button
          variant="contained"
          onClick={() => navigate("/sign-in", setOption("signUp"))}
        >
          REGISTRARSE
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/sign-in", setOption("logIn"))}
        >
          INGRESAR
        </Button>
        <Link to="/operar">
          <Button variant="outlined">OPERAR</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
