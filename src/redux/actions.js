export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const GET_USERS = 'GET_USERS';
export const GET_PLACE_HOLDER = 'GET_PLACE_HOLDER';

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const PLACE_HOLDER_API = 'https://jsonplaceholder.typicode.com/posts';

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setEmail = email => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};

export const getUsers = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Context-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_USERS,
          payload: json,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPlaceHolderData = () => {
  return async dispatch => {
    const result = await fetch(PLACE_HOLDER_API, {
      method: 'GET',
      headers: {
        'Context-Type': 'application/json',
      },
    });
    const json = await result.json();
    // console.log('API call: ' + json);
    // let placeHolderObj = {};
    // if(json[0].userId != null) {

    // }
    if (json) {
      dispatch({
        type: GET_PLACE_HOLDER,
        payload: json,
      });
    } else {
      console.log('API call failed!');
    }
  };
};
