import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';
import {ACCOUNTS_LIST, ACCOUNT_REMOVED, MESSAGE_ADD, MESSAGE_REMOVE} from '../reducers/actionTypes';
import {FETCH_ACCOUNTS, LIST_SETTINGS} from "./actionTypes";


export function* fetchAccountsList(action) {
  // call the api to get the users list
  const auth = action.auth;
  try {
    console.log('Fetch accounts called')
    console.log(auth)
    if (auth) {
      const accounts = yield call(OrdersApi.listAccountInfos, auth);
      console.log('Accounts : ', accounts);
      // save the users in state
      yield put({
        type: ACCOUNTS_LIST,
        accounts: accounts.data,
      });
    }
  } catch (e) {
     console.log('Exception getting accounts : ', e);
  }


}

export function* updateAccount(action) {

  const auth = action.auth;

  const account = yield call(OrdersApi.updateAccount,action.data, auth);

  OrdersApi.waitForFiveSeconds();

  const message = {
    life: 5000,
    severity: 'info',
    text: 'Account info saved'
  };

  yield put({
    type: MESSAGE_ADD,
    data: message
  });

  yield put({
    type : FETCH_ACCOUNTS,
    auth : auth
  });

  const rett = yield call(OrdersApi.waitForFiveSeconds);

  yield put({
    type: MESSAGE_REMOVE
  })

}

export function* removeAccount(action) {

  const auth = action.auth;
  console.log('Remove account action : ',action);

  try {

    if(auth) {

      const account = action.account;
      console.log('Removing account : ', account);
      const ret = yield call(OrdersApi.removeAccountInfo, account ,auth);

      yield put({
        type : FETCH_ACCOUNTS, auth : auth
      });

      yield put({
          type : ACCOUNT_REMOVED
      });

    }

  } catch (e) {
    console.log('Exception removing account : ', e);
  }

}
