import "./Main.scss";

import { AdvancedChart, TickerTape } from "react-tradingview-embed";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import HeaderMain from "../../molecules/HeaderMain/HeaderMain";
import React from "react";
import creditCard from "../../../utils/assets/svg/creditcard.svg";
import percentage from "../../../utils/assets/svg/percentage.svg";
import portfolio from "../../../utils/assets/svg/portfolio.svg";
import { symbols } from "../../../utils/constants";

function Main({ setOption }) {
  const navigate = useNavigate();

  const goToSignUp = () => navigate("/sign-in", setOption("signUp"));
  const goToLogIn = () => navigate("/sign-in", setOption("logIn"));

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
            <Button variant="outlined" onClick={goToSignUp}>
              REGISTRARSE
            </Button>
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
            <Button variant="outlined" onClick={goToSignUp}>
              REGISTRARSE
            </Button>
          </div>
          <img src={creditCard} alt="tarjeta de credito" />
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">SIN COMISIONES!</h1>
            <p className="p_text">
              Si, leiste bien. El primer exchange que no te cobra NADA por
              ingresar/retirar dinero o comprar/vender cualquier activo.
            </p>
            <Button variant="outlined" onClick={goToSignUp}>
              Comprar sin comision
            </Button>
          </div>
          <img src={percentage} alt="sin comisiones" />
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">Graficos en vivo las 24hs</h1>
            <p className="p_text">
              Consulta el grafico del activo que mas te guste, para estar al
              tanto de mercado en cualquier momento desde nuestra plataforma.
            </p>
            <Button variant="outlined" onClick={goToSignUp}>
              REGISTRARSE
            </Button>
          </div>
          <div className="chart_container">
            <AdvancedChart
              widgetProps={{
                symbol: "BTCUSD",
                allow_symbol_change: false,
                interval: "D",
                style: 1,
                locale: "es",
                range: "2m",
                hide_side_toolbar: true,
                hide_top_toolbar: true,
                withdateranges: false,
                height: 300,
                width: window.innerWidth > 1000 ? 500 : 350,
              }}
            />
          </div>
        </section>
        <section className="section_container--flex">
          <div>
            <h1 className="h1_text">Portfolio detallado</h1>
            <p className="p_text">
              Consulta tu portolio personal con hasta el ultimo detalle.
            </p>
            <Button variant="outlined" onClick={goToSignUp}>
              REGISTRARSE
            </Button>
          </div>
          <img src={portfolio} alt="portfolio detallado" />
        </section>
        <section className="section_container--last">
          <div className="last_div">
            <h1 className="h1_text--center">Que estas esperando?</h1>
            <p className="p_text">Comenza ya mismo a generar ganancias.</p>
            <div>
              <Button variant="contained" onClick={goToSignUp}>
                REGISTRARSE
              </Button>
              <Button variant="outlined" onClick={goToLogIn}>
                INGRESAR
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
