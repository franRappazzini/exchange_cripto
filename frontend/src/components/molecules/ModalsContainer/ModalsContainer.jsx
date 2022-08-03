import { useDispatch, useSelector } from "react-redux";

import ModalCompra from "../ModalCompra/ModalCompra";
import ModalVenta from "../ModalVenta/ModalVenta";
import React from "react";
import { getUser } from "../../../redux/actions/userActions";

function ModalsContainer({ modals, setModals, coin }) {
  const { logedUser } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  const dispatch = useDispatch();

  function updateUser() {
    dispatch(getUser(localUser.id));
  }

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
          updateUser={updateUser}
        />
      )}
      {modals.sell && (
        <ModalVenta
          modals={modals}
          handleClose={handleClose}
          coin={coin}
          logedUser={logedUser}
          updateUser={updateUser}
        />
      )}
    </>
  );
}

export default ModalsContainer;
