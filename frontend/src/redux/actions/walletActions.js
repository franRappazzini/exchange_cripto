import axios from "axios";

export async function depositMoney(walletId, amount) {
  try {
    await axios.put(`http://localhost:3001/wallet/${walletId}`, { amount });
  } catch (err) {
    return err;
  }
}
