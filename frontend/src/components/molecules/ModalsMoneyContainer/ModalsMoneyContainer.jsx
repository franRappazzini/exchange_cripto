import { useDispatch, useSelector } from "react-redux";

import ModalIngresoDinero from "../ModalIngresoDinero/ModalIngresoDinero";
import ModalRetiroDinero from "../ModalRetiroDinero/ModalRetiroDinero";
import React from "react";
import { setLogedUser } from "../../../redux/actions/userActions";

function ModalsMoneyContainer({ modals, setModals }) {
  const { logedUser } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  const dispatch = useDispatch();

  function updateUser() {
    localUser.id && dispatch(setLogedUser(localUser.id));
  }

  function handleClose() {
    setModals({ deposit: false, withdrawal: false });
  }

  return (
    <>
      {modals.deposit && (
        <ModalIngresoDinero
          modals={modals}
          handleClose={handleClose}
          updateUser={updateUser}
          logedUser={logedUser}
        />
      )}
      {modals.withdrawal && (
        <ModalRetiroDinero
          modals={modals}
          handleClose={handleClose}
          updateUser={updateUser}
          logedUser={logedUser}
        />
      )}
    </>
  );
}

export default ModalsMoneyContainer;
