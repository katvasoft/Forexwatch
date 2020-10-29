import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';
import {SETTINGS_LIST, SETTING_SAVED, MESSAGE_ADD, MESSAGE_REMOVE} from '../reducers/actionTypes';
import {LIST_SETTINGS} from "./actionTypes";


export function* querySettings(action) {

  
  const auth = action.auth;
  console.log('Querying settings : ',auth)
  const settings = yield call(OrdersApi.getSettings,auth);

  console.log('Retrieved settings : ', settings);

  yield put({
    type : SETTINGS_LIST,
    data : settings.data
  })

}

export function* listAccountSettings(action) {

  const auth = action.auth;
  const accountId = action.data;

  const settings = yield call(OrdersApi.getAccountSettings,accountId,auth);

  yield put({
    type : SETTINGS_LIST,
    data : settings.data
  })

}

export function* saveSetting (action) {

  const auth = action.auth;

  const setting = yield call(OrdersApi.saveSetting,action.data, auth);

  OrdersApi.waitForFiveSeconds();

  const message = {
    life: 5000,
    severity: 'info',
    text: 'Setting saved'
  }

  yield put({
    type: MESSAGE_ADD,
    data: message
  })

  yield put({
    type : LIST_SETTINGS,
    auth : auth
  });

  const rett = yield call(OrdersApi.waitForFiveSeconds);

  yield put({
    type: MESSAGE_REMOVE
  })

}

export function* removeSetting(action) {

  const auth = action.auth;


  const retval = yield call(OrdersApi.removeSetting, action.data, auth);

  yield put({
    type : LIST_SETTINGS,
    auth : auth
  });

}
