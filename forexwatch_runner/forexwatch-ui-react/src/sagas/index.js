// main saga generators
import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {LOGIN,FETCH_ACCOUNTS, LIST_ACCOUNT_SETTINGS, LIST_SETTINGS, 
        SAVE_SETTING, QUERY_ORDERS, UPDATE_ACCOUNT, ACCOUNT_ALERT_ADD, ACCOUNT_ALERT_LIST} from './actionTypes';

import { loginToForexwatch } from './login';
import { fetchAccountsList, updateAccount } from './accounts';
import {querySettings, listAccountSettings,saveSetting} from './settings';
import { fetchAccountAlerts, addAccountAlert } from './accountAlert';
import { queryOrders } from './orders';

export function* sagas() {
  yield all( [
    
    takeLatest(LOGIN, loginToForexwatch),
    takeLatest(FETCH_ACCOUNTS,fetchAccountsList),
    takeLatest(LIST_ACCOUNT_SETTINGS, listAccountSettings),
    takeLatest(LIST_SETTINGS, querySettings),
    takeLatest(SAVE_SETTING,saveSetting),
    takeLatest(QUERY_ORDERS, queryOrders),
    takeLatest(UPDATE_ACCOUNT, updateAccount),
    takeLatest(ACCOUNT_ALERT_LIST, fetchAccountAlerts),
    takeLatest(ACCOUNT_ALERT_ADD, addAccountAlert)

  ]);
}

export default sagas;