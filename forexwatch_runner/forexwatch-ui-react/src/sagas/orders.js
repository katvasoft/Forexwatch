import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';
import {ORDER_LIST, FOREXWATCH_STATUS, IS_LOADING, STRATEGY_NAMES_LIST} from '../reducers/actionTypes';
// fetch the user's list
export function* ordersFetchList(action) {
  // call the api to get the users list
  const orders = yield call(OrdersApi.getOrders);
  console.log('Orders : ', orders);
  // save the users in state
  yield put({
    type: ORDER_LIST,
    orders: orders.data,
  });
}

export function* queryOrders(action) {

  const auth = action.auth;
  console.log('Query orders sagas, action  : ',action );
  const orders = yield call(OrdersApi.queryOrders,action.data, auth);

  console.log('Got order from query : ', orders);

  yield put({
    type: ORDER_LIST,
    orders: orders.data,
  });
}

export function* listStrategyNames(action) {


  console.log('Saga action : ', action  );
  const auth = action.auth;

  const strategyNames = yield call(OrdersApi.listStrategyNames, auth);

  console.log('Got strategy names : ', strategyNames);

  yield put({
    type: STRATEGY_NAMES_LIST,
    strategyNames: strategyNames.data,
  });


}

export function* queryStatus(action) {

  const auth = action.auth;

  if(auth) {
    try {
      const status = yield call(OrdersApi.getForexWatchStatus,auth);

      console.log('Got status from server : ', status);

      yield put ({
        type :FOREXWATCH_STATUS,
        status : status.data,
        loadingStatus : false
      });

    } catch (e) {
      console.log('Something went wrong when getting status... ')
    }

  }

}

export function* stopOrder(action) {

  const auth = action.auth;

  if(auth) {

    const order = action.order;

    const ret = yield call(OrdersApi.closeOrder, order, auth);

    console.log('Stop order : ', ret);

  }


}

export function* saveOrder(action) {

  const auth = action.auth;

  const order = action.order;

  console.log('Saving order : ', order);

  if(auth) {

    const ret = yield call(OrdersApi.saveOrder, order, auth);

    console.log('Save order : ', ret);

  }

}

export function* removeOrder(action) {

  const auth = action.auth;

  if(auth) {

    const orderId = action.order.id;

    console.log('Order id to remove : ', orderId);

    const ret = yield call(OrdersApi.removeOrder, orderId, auth);

    console.log('Remove order : ', ret);

  }

}

export function* startClient(action) {

  const auth = action.auth;

  const ret = yield call(OrdersApi.startJForexClient,auth);

  console.log('Start client return : ', ret);

  const rett = yield call(OrdersApi.waitForFiveSeconds);

  const status = yield call(OrdersApi.getForexWatchStatus, auth);

  yield put({
    type : IS_LOADING,
    loadingStatus : false
  });

  console.log('Got status from server in start client : ', status);

  yield put ({
    type :FOREXWATCH_STATUS,
    status : status.data
  });

}


export function* stopClient (action) {

  const auth = action.auth;

  const ret = yield call(OrdersApi.stopJForexClient,auth);

  const rett = yield call(OrdersApi.waitForFiveSeconds);

  const status = yield call(OrdersApi.getForexWatchStatus, auth);

  yield put({
    type : IS_LOADING,
    loadingStatus : false
  });

  console.log('Got status from server in start client : ', status);

  yield put ({
    type :FOREXWATCH_STATUS,
    status : status.data
  });

}
