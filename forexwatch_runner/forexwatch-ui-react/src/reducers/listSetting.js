import {SETTINGS_LIST} from './actionTypes';

export default function listSettings(state = {}, action) {

  switch (action.type) {

    case SETTINGS_LIST:
    
      return action.data;

    default:

      return state;

  }

}
