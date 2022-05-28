import {
  SET_USER_NAME,
  SET_USER_EMAIL,
  GET_USERS,
  GET_PLACE_HOLDER,
} from './actions';

const initialState = {
  name: '',
  email: '',
  users: [],
  jsonHolder: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    case GET_USERS:
      return {...state, users: action.payload};
    case GET_PLACE_HOLDER:
      return {...state, jsonHolder: action.payload};
    default:
      return state;
  }
}

export default userReducer;
