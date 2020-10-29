import {SHOW_DIALOG, CLOSE_DIALOG} from './actionTypes';

export default function dialog(state = {}, action) {

 switch (action.type) {
    case SHOW_DIALOG:
      console.log('Action received : ', action);
      return {
        showDialog : true,
        selectedObject : action.selectedObject
      };

   case CLOSE_DIALOG :

     return {
       showDialog : false,
       selectedObject : action.selectedObject
     };
    // initial state
    default:
      return state;
  }

}
