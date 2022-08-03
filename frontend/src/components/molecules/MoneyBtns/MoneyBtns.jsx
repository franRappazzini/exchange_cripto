import React, { useState } from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ModalsMoneyContainer from "../ModalsMoneyContainer/ModalsMoneyContainer";

function MoneyBtns() {
  const [modals, setModals] = useState({ income: false, withdrawal: false });

  return (
    <>
      <section className="btns_container">
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setModals({ ...modals, income: true })}
        >
          Ingresar dinero
        </Button>
        <Link to={"/operar"}>
          <Button color="success" variant="contained">
            INVERTIR
          </Button>
        </Link>
        <Button color="error" variant="outlined">
          Retirar dinero
        </Button>
      </section>

      {modals.income && (
        <ModalsMoneyContainer modals={modals} setModals={setModals} />
      )}
    </>
  );
}

export default MoneyBtns;
