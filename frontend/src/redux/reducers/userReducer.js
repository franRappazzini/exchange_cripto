import { GET_ONE_USER } from "../actions/userActions";

const initialState = {
  users: [],
  logedUser: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_USER:
      return { ...state, logedUser: action.payload };
    default:
      return state;
  }
}
