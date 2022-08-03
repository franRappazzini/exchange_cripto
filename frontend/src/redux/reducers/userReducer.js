import { GET_ALL_USERS, SET_LOGED_USER } from "../actions/userActions";

const initialState = {
  users: [],
  logedUser: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case SET_LOGED_USER:
      return { ...state, logedUser: action.payload };
    default:
      return state;
  }
}
