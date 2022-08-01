import ModalCompra from "../ModalCompra/ModalCompra";
import ModalVenta from "../ModalVenta/ModalVenta";
import React from "react";

function ModalsContainer({ modals, setModals, coin }) {
  function handleClose() {
    setModals({ buy: false, sell: false });
  }

  return (
    <>
      {modals.buy && (
        <ModalCompra modals={modals} handleClose={handleClose} coin={coin} />
      )}
      {modals.sell && (
        <ModalVenta modals={modals} handleClose={handleClose} coin={coin} />
      )}
    </>
  );
}

export default ModalsContainer;
