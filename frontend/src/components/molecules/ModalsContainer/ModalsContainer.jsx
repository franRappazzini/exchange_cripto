import ModalCompra from "../ModalCompra/ModalCompra";
import ModalVenta from "../ModalVenta/ModalVenta";
import React from "react";
import { useSelector } from "react-redux";

function ModalsContainer({ modals, setModals, coin }) {
  const { logedUser } = useSelector((state) => state.user);

  function handleClose() {
    setModals({ buy: false, sell: false });
  }

  return (
    <>
      {modals.buy && (
        <ModalCompra
          modals={modals}
          handleClose={handleClose}
          coin={coin}
          logedUser={logedUser}
        />
      )}
      {modals.sell && (
        <ModalVenta
          modals={modals}
          handleClose={handleClose}
          coin={coin}
          logedUser={logedUser}
        />
      )}
    </>
  );
}

export default ModalsContainer;
