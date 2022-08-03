import {
  ADD_FAVORITE_COIN,
  GET_COINS,
  REMOVE_FAVORITE_COIN,
} from "../actions/cryptoActions";

const initialState = {
  allCoins: [],
  favorites: [],
};

export default function cryptoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS:
      return { ...state, allCoins: action.payload };
    case ADD_FAVORITE_COIN:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE_COIN:
      const favorites = state.favorites.filter(
        (coin) => coin.name !== action.payload.name
      );
      return { ...state, favorites };
    default:
      return state;
  }
}
