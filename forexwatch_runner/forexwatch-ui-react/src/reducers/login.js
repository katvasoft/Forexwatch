import {LOGIN_SUCCESFUL, LOGIN_UNSUCCESFUL} from './actionTypes';

export default function login(state = {}, action) {


  switch (action.type) {
    case LOGIN_SUCCESFUL:
      console.log('Login result received : ', action.data);
      return action.data;

    case LOGIN_UNSUCCESFUL:

      console.log('Login was unsuccesful...');
      return action.data;
    // initial state
    default:
      return state;
  }
}
