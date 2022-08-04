import React, { useState } from "react";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ModalsMoneyContainer from "../ModalsMoneyContainer/ModalsMoneyContainer";

function MoneyBtns() {
  const [modals, setModals] = useState({ deposit: false, withdrawal: false });

  return (
    <>
      <section className="btns_container">
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setModals({ ...modals, deposit: true })}
        >
          Ingresar dinero
        </Button>
        <Link to={"/coins"}>
          <Button color="success" variant="contained">
            INVERTIR
          </Button>
        </Link>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setModals({ ...modals, withdrawal: true })}
        >
          Retirar dinero
        </Button>
      </section>

      {(modals.deposit || modals.withdrawal) && (
        <ModalsMoneyContainer modals={modals} setModals={setModals} />
      )}
    </>
  );
}

export default MoneyBtns;
