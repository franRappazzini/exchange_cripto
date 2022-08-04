import axios from "axios";

export const GET_ONE_USER = "GET_ONE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const SET_LOGED_USER = "SET_LOGED_USER";

const URL = "http://localhost:3001/users";

export async function createUser(user) {
  try {
    await axios.post(URL, user);
  } catch (err) {
    return err;
  }
}

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const res = await axios.get(URL);
      dispatch({ type: GET_ALL_USERS, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}

export function setLogedUser(user) {
  return async (dispatch) => {
    if (typeof user === "object") {
      dispatch({ type: SET_LOGED_USER, payload: user });
    } else {
      try {
        const res = await axios.get(`${URL}/${user}`);
        dispatch({ type: SET_LOGED_USER, payload: res.data });
      } catch (err) {
        return err;
      }
    }
  };
}

export async function changePassword(userId, password) {
  try {
    await axios.put(`${URL}/${userId}`, { password });
  } catch (err) {
    return err;
  }
}
