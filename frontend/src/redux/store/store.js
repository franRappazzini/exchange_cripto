import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../reducers/cryptoReducer";
import userReducer from "../reducers/userReducer";

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
    user: userReducer,
  },
});
