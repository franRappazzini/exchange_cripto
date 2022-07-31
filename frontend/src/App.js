import "./App.css";

import { Route, Routes } from "react-router-dom";

import CoinDetail from "./components/organisms/CoinDetail/CoinDetail";
import Header from "./components/molecules/Header/Header";
import Home from "./components/organisms/Home/Home";
import Main from "./components/organisms/Main/Main";
import Operar from "./components/organisms/Operar/Operar";
import SignIn from "./components/organisms/SignIn/SignIn";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/sign-in" element={<SignIn />} />

        <Route path="/home" element={<Home />} />

        <Route path="/operar" element={<Operar />} />

        <Route path="/coin/:idCoin" element={<CoinDetail />} />
      </Routes>
    </>
  );
}

export default App;
