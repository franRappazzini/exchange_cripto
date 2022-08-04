import { useDispatch, useSelector } from "react-redux";

import ModalIngresoDinero from "../ModalIngresoDinero/ModalIngresoDinero";
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
    setModals({ income: false, withdrawal: false });
  }

  return (
    <>
      <ModalIngresoDinero
        modals={modals}
        handleClose={handleClose}
        updateUser={updateUser}
        logedUser={logedUser}
      />
    </>
  );
}

export default ModalsMoneyContainer;
