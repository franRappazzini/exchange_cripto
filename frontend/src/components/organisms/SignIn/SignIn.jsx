import "./SignIn.scss";
import {} from "@mui/material";

import React, { useState } from "react";

import FormLogIn from "../../molecules/FormLogIn/FormLogIn";
import FormSignUp from "../../molecules/FormSingUp/FormSignUp";
import { useEffect } from "react";

function SignIn() {
  const [userLogIn, setUserLogIn] = useState({ email: "", password: "" });
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(userLogIn);
  }, [userLogIn]);

  return (
    <main className="signn-in_component">
      <FormLogIn userLogIn={userLogIn} setUserLogIn={setUserLogIn} />

      <FormSignUp newUser={newUser} setNewUser={setNewUser} />
    </main>
  );
}

export default SignIn;
