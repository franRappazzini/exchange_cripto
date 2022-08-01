import {
  GET_ONE_USER,
  GET_USERS,
  SET_LOGED_USER,
} from "../actions/userActions";

const initialState = {
  users: [],
  logedUser: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };
    case SET_LOGED_USER:
      return { ...state, logedUser: action.payload };
    // case GET_ONE_USER:
    //   return { ...state, logedUser: action.payload };
    default:
      return state;
  }
}
