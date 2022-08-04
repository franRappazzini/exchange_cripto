import "./Main.scss";

import { Button } from "@mui/material";
import HeaderMain from "../../molecules/HeaderMain/HeaderMain";
import { Link } from "react-router-dom";
import React from "react";
import { TickerTape } from "react-tradingview-embed";
import { symbols } from "../../../utils/constants";

function Main({ setOption }) {
  return (
    <>
      <HeaderMain setOption={setOption} />

      <main className="main_component">
        <section className="section_container">
          <div className="div--margin-bottom">
            <h1 className="h1_text">
              INVERTI EN LAS MEJORES CRIPTO DEL MOMENTO
            </h1>
            <p className="p_text">
              Invertí y obtené rendimientos a corto/largo plazo.
            </p>
            <Link to="/home">
              <Button variant="outlined">REGISTRARSE</Button>
            </Link>
          </div>

          <TickerTape
            widgetProps={{
              symbols: symbols,
              locale: "es",
              displayMode: "adaptive",
            }}
          />
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">Compra y vende en segundos</h1>
            <p className="p_text">
              Compra de forma instantánea y segura, y con las mejores comisiones
              del mercado durante las 24 horas del día. Nunca antes habia sido
              tan facil.
            </p>
            <Button variant="outlined">REGISTRARSE</Button>
          </div>
          <img src="" alt="img" />
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">SIN COMISIONES!</h1>
            <p className="p_text">
              Si, leiste bien. El primer exchange que no te cobra NADA por
              ingresar/retirar dinero o comprar/vender cualquier activo.
            </p>
            <Button variant="outlined">COMPRAR SIN COMISION</Button>
          </div>
          <img src="" alt="img" />
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">Graficos en vivo las 24hs</h1>
            <p className="p_text">
              Consulta el grafico del activo que mas te guste, para estar al
              tanto de mercado en cualquier momento desde nuestra plataforma.
            </p>
            <Button variant="outlined">REGISTRARSE</Button>
          </div>
          <h1>grafico tw</h1>
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">Portfolio detallado</h1>
            <p className="p_text">
              Consulta tu portolio personal con hasta el ultimo detalle.
            </p>
            <Button variant="outlined">REGISTRARSE</Button>
          </div>
          <img src="" alt="img" />
        </section>
        <section className="section_container--last">
          <div className="last_div">
            <h1 className="h1_text">Que estas esperando?</h1>
            <p className="p_text">Comenza ya mismo a generar ganancias.</p>
            <div>
              <Button variant="contained">REGISTRARSE</Button>
              <Button variant="outlined">INGRESAR</Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
