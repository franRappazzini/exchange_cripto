import "./Account.scss";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../molecules/Header/Header";
import ModalChangePassword from "../../molecules/ModalChangePassword/ModalChangePassword";
import { setLogedUser } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Account() {
  const [modal, setModal] = useState(false);
  const {
    logedUser: { id, name, lastName, email, password },
  } = useSelector((state) => state.user);
  const localUser = JSON.parse(localStorage.getItem("logedUser")) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localUser.id && dispatch(setLogedUser(localUser.id)); // porque necesito el logedUser actualizado
    if (!JSON.parse(localStorage.getItem("logedUser"))) navigate("/"); // si no hay logedUser, volvemos al inicio

    console.log("account");
  }, [dispatch, navigate, localUser.id]);

  function updateUser() {
    dispatch(setLogedUser(localUser.id));
  }
  function handleLogOut() {
    localStorage.removeItem("logedUser");
    navigate("/");
  }

  return (
    <>
      <Header />

      <main className="account_component component">
        {name && (
          <Card elevation={4} sx={{ minWidth: "50vw", height: "fit-content" }}>
            <CardHeader title="Mis datos" />
            <CardContent className="account-card_container">
              <div>
                <Typography>{name}</Typography>
                <Typography variant="body2" color={"gray"}>
                  Nombres
                </Typography>
              </div>
              <div>
                <Typography>{lastName}</Typography>
                <Typography variant="body2" color={"gray"}>
                  Apellidos
                </Typography>
              </div>
              <div>
                <Typography>{email}</Typography>
                <Typography variant="body2" color={"gray"}>
                  Email
                </Typography>
              </div>
              <div>
                {/* <Typography>{password}</Typography> */}
                <Typography>********</Typography>
                <Typography variant="body2" color={"gray"}>
                  Contraseña
                </Typography>
              </div>
              <Button
                size="small"
                variant="text"
                color="error"
                onClick={handleLogOut}
              >
                Cerrar sesion
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => setModal(true)}
              >
                Cambiar contraseña
              </Button>
            </CardContent>
          </Card>
        )}

        <ModalChangePassword
          modal={modal}
          setModal={setModal}
          id={id}
          password={password}
          updateUser={updateUser}
        />
      </main>
    </>
  );
}

export default Account;
