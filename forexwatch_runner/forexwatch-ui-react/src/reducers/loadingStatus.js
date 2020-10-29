import {IS_LOADING} from './actionTypes';

export default function loadingStatus(state = {}, action) {


  switch (action.type) {
    case IS_LOADING:
      console.log('Order action received : ', action);
      return action.loadingStatus;


    // initial state
    default:
      return state;
  }
}
