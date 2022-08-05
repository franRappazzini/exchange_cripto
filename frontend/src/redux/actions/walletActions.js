import axios from "axios";

export async function moneyTransfer(walletId, amount) {
  try {
    await axios.put(`/wallet/${walletId}`, { amount });
  } catch (err) {
    return err;
  }
}
