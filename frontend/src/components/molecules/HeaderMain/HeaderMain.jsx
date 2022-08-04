import "./HeaderMain.scss";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import React from "react";

function HeaderMain({ setOption }) {
  const navigate = useNavigate();

  return (
    <header className="main-header_component">
      <Link to="/">
        <h1>HeaderMain</h1>
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
      </div>
    </header>
  );
}

export default HeaderMain;
