import axios from "axios";

export const GET_COINS = "GET_COINS";
export const ADD_FAVORITE_COIN = "ADD_FAVORITE_COIN";
export const REMOVE_FAVORITE_COIN = "REMOVE_FAVORITE_COIN";

export function getCoins() {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );

      return dispatch({ type: GET_COINS, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}

export async function tradingCoins(coin) {
  try {
    await axios.post("/coins", coin);
  } catch (err) {
    return err;
  }
}

export function addFavoriteCoin(coin) {
  return (dispatch) => dispatch({ type: ADD_FAVORITE_COIN, payload: coin });
}

export function removeFavoriteCoin(coin) {
  return (dispatch) => dispatch({ type: REMOVE_FAVORITE_COIN, payload: coin });
}
