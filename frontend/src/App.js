import "./App.css";

import { Route, Routes } from "react-router-dom";

import Account from "./components/organisms/Account/Account";
import CoinDetail from "./components/organisms/CoinDetail/CoinDetail";
import Coins from "./components/organisms/Coins/Coins";
import Home from "./components/organisms/Home/Home";
import Main from "./components/organisms/Main/Main";
import Page404 from "./components/organisms/Page404/Page404";
import SignIn from "./components/organisms/SignIn/SignIn";
import { useState } from "react";

function App() {
  const [option, setOption] = useState("logIn");

  // TODO ver si sacar los alert afuera del component

  return (
    <>
      <Routes>
        <Route path="/" element={<Main setOption={setOption} />} />

        <Route
          path="/sign-in"
          element={<SignIn option={option} setOption={setOption} />}
        />

        <Route path="/home" element={<Home />} />

        <Route path="/coins" element={<Coins />} />

        <Route path="/coin/:idCoin" element={<CoinDetail />} />

        <Route path="/account" element={<Account />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
