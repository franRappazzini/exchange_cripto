import "./SignIn.scss";

import React, { useState } from "react";

import { Button } from "@mui/material";
import FormLogIn from "../../molecules/FormLogIn/FormLogIn";
import FormSignUp from "../../molecules/FormSingUp/FormSignUp";

function SignIn({ option, setOption }) {
  const [userLogIn, setUserLogIn] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleClick() {
    setOption(option === "logIn" ? "signUp" : "logIn");
  }

  return (
    <main className="sign-in_component">
      <div
        className="backgroud_black"
        style={option === "logIn" ? { right: 0 } : { left: 0 }}
      >
        <p>
          {option === "logIn" ? "Si no tienes cuenta," : "Si ya tienes cuenta,"}
          <Button onClick={handleClick}>
            {option === "logIn" ? "registrate." : "inicia sesion."}
          </Button>
        </p>
      </div>

      <FormLogIn userLogIn={userLogIn} setUserLogIn={setUserLogIn} />

      <FormSignUp
        newUser={newUser}
        setNewUser={setNewUser}
        setOption={setOption}
      />
    </main>
  );
}

export default SignIn;
