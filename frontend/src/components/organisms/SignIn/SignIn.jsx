import "./SignIn.scss";

import React, { useState } from "react";

import { Button } from "@mui/material";
import FormLogIn from "../../molecules/FormLogIn/FormLogIn";
import FormSignUp from "../../molecules/FormSingUp/FormSignUp";
import HeaderMain from "../../molecules/HeaderMain/HeaderMain";

function SignIn({ option, setOption }) {
  const [userLogIn, setUserLogIn] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const innerWidth = window.innerWidth;

  function handleClick() {
    setOption(option === "logIn" ? "signUp" : "logIn");
  }

  return (
    <>
      <HeaderMain setOption={setOption} />

      <main className="sign-in_component">
        <div
          className="backgroud_black"
          style={option === "logIn" ? { right: 0 } : { left: 0 }}
        >
          <p>
            {option === "logIn"
              ? "Si no tienes cuenta,"
              : "Si ya tienes cuenta,"}
            <Button onClick={handleClick}>
              {option === "logIn" ? "registrate" : "inicia sesion"}
            </Button>
          </p>
        </div>

        {((innerWidth < 700 && option === "logIn") || innerWidth > 700) && (
          <FormLogIn userLogIn={userLogIn} setUserLogIn={setUserLogIn} />
        )}

        {((innerWidth < 700 && option === "signUp") || innerWidth > 700) && (
          <FormSignUp
            newUser={newUser}
            setNewUser={setNewUser}
            setOption={setOption}
          />
        )}
      </main>
    </>
  );
}

export default SignIn;
