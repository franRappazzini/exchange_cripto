import axios from "axios";

export const GET_COINS = "GET_COINS";

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
    await axios.post("http://localhost:3001/coins", coin);
  } catch (err) {
    return err;
  }
}
