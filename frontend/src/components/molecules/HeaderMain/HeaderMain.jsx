import "./HeaderMain.scss";

import { Box, Button, SwipeableDrawer } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function HeaderMain({ setOption }) {
  const [burger, setBurger] = useState(false);

  const navigate = useNavigate();

  function toggleDrawer(option) {
    setBurger(option);
  }

  return (
    <header className="main-header_component">
      <Link to="/">
        <h1>HeaderMain</h1>
      </Link>

      <div>
        <Button onClick={() => toggleDrawer(true)}>
          {burger ? <Close /> : <Menu />}
        </Button>
        <SwipeableDrawer
          anchor="right"
          open={burger}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: window.innerWidth < 821 ? "65vw" : "25vw",
              p: "1rem",
              gridGap: "0.5rem",
            }}
          >
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
          </Box>
        </SwipeableDrawer>
      </div>
    </header>
  );
}

export default HeaderMain;
