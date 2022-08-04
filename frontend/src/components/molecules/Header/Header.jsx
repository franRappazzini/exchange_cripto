import "./Header.scss";

import { Box, Button, SwipeableDrawer } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Header() {
  const [burger, setBurger] = useState(false);
  const navigate = useNavigate();

  function toggleDrawer(option) {
    setBurger(option);
  }

  function handleLogOut() {
    localStorage.removeItem("logedUser");
    navigate("/");
  }

  return (
    <header className="header_component">
      <Link to="/home">
        <h1>Home</h1>
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
              minWidth: "25vw",
              p: "1rem",
              gridGap: "0.5rem",
            }}
          >
            <NavLink to={"/home"}>
              <Button variant="text">Porfolio</Button>
            </NavLink>
            <Link to={"/coins"}>
              <Button variant="text">Coins</Button>
            </Link>
            <Link to={"/coins"}>
              <Button variant="text">Mi cuenta</Button>
            </Link>

            <div>
              <Button variant="text" color="error" onClick={handleLogOut}>
                Cerrar sesion
              </Button>
            </div>
          </Box>
        </SwipeableDrawer>
      </div>
    </header>
  );
}

export default Header;
