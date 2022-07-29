import { GET_COINS } from "../actions/cryptoActions";

const initialState = {
  allCoins: [],
};

export default function cryptoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS:
      return { ...state, allCoins: action.payload };
    default:
      return state;
  }
}
