import "./Header.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <header className="header_component">
      <h1>Header</h1>
      <div className="btn_container">
        <Button variant="contained">REGISTRARSE</Button>
        <Button variant="outlined">INGRESAR</Button>
        <Link to="/operar">
          <Button variant="outlined">OPERAR</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
