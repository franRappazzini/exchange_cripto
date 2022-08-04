import "./App.css";

import { Route, Routes } from "react-router-dom";

import Account from "./components/organisms/Account/Account";
import CoinDetail from "./components/organisms/CoinDetail/CoinDetail";
import Coins from "./components/organisms/Coins/Coins";
import Home from "./components/organisms/Home/Home";
import Main from "./components/organisms/Main/Main";
import SignIn from "./components/organisms/SignIn/SignIn";
import { useState } from "react";

function App() {
  const [option, setOption] = useState("logIn");

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

        {/* TODO page 404 */}
      </Routes>
    </>
  );
}

export default App;
