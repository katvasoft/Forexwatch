import {ORDER_LIST,CLEAR_ORDERS, ORDER_SELECTED} from './actionTypes';

export default function orders(state = {}, action) {


  switch (action.type) {
    case ORDER_LIST:
      console.log('Order action received : ', action);
      return action.orders;


    case CLEAR_ORDERS:

      return [];

    case ORDER_SELECTED:

      return action.data;

    // initial state
    default:
      return state;
  }

}
