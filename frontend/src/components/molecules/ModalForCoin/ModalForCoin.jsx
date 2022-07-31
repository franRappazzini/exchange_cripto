import ModalCompra from "../ModalCompra/ModalCompra";
import ModalVenta from "../ModalVenta/ModalVenta";
import React from "react";

function ModalForCoin({ modals, setModals, coin }) {
  function handleClose() {
    setModals({ buy: false, sell: false });
  }

  return (
    <>
      {modals.buy && (
        <ModalCompra modals={modals} handleClose={handleClose} {...coin} />
      )}
      {modals.sell && (
        <ModalVenta modals={modals} handleClose={handleClose} {...coin} />
      )}
    </>
  );
}

export default ModalForCoin;
