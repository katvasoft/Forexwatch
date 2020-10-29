import {ACCOUNTS_LIST} from './actionTypes';

export default function accounts(state = {}, action) {

  switch (action.type) {
    case ACCOUNTS_LIST:
      console.log('Account action received : ', action.accounts);
      return action.accounts;


    // initial state
    default:
      return state;
  }

}
