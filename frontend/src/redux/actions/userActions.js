import axios from "axios";

export const GET_ONE_USER = "GET_ONE_USER";
export const GET_USERS = "GET_USERS";
export const SET_LOGED_USER = "SET_LOGED_USER";

const URL = "http://localhost:3001/users";

export async function createUser(user) {
  try {
    await axios.post(URL, user);
  } catch (err) {
    return err;
  }
}

export function getUsers() {
  return async (dispatch) => {
    try {
      const res = await axios.get(URL);
      dispatch({ type: GET_USERS, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}

export function setLogedUser(user) {
  return (dispatch) => dispatch({ type: SET_LOGED_USER, payload: user });
}

// ????
export function getOneUser(email) {
  return async (dispatch) => {
    try {
      const res = await axios(URL + email);
      dispatch({ type: GET_ONE_USER, payload: res.data });
    } catch (err) {
      return err;
    }
  };
}
