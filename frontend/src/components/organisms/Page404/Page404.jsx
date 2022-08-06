import "./Page404.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import img404 from "../../../utils/assets/svg/404.svg";

function Page404() {
  return (
    <main className="page404_component component">
      <section>
        <h1>Ooops.. Error 404</h1>
        <h3>Pagina no encontrada</h3>
        <Link to={"/home"}>
          <Button variant="outlined">Volver al inicio</Button>
        </Link>
      </section>
      <img src={img404} alt="error 404" />
    </main>
  );
}

export default Page404;
