import {MESSAGE_ADD,MESSAGE_REMOVE} from './actionTypes';

export default function message(state = {}, action) {

  switch (action.type) {
    case MESSAGE_ADD:
      
      return action.data;


    // initial state
    default:
      return state;

    case MESSAGE_REMOVE:

        return {}
  }

}
