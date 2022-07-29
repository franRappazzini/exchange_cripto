import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../reducers/cryptoReducer";

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
    user: "",
  },
});
