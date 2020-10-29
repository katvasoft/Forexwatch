import {ACCOUNT_EDIT} from './actionTypes';

export default function selectAccount(state = {}, action) {

  switch (action.type) {
    case ACCOUNT_EDIT:
      console.log('Account : ', action)
      return action.data;


    // initial state
    default:
      return state;
  }

}
