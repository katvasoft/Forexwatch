import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';

import {ACCOUNT_ALERT_LIST} from "./actionTypes";
import {ACCOUNT_ALERTS_LISTED, MESSAGE_ADD, MESSAGE_REMOVE, ACCOUNT_ALERT_ADDED} from '../reducers/actionTypes';

export function* fetchAccountAlerts(action) {

    const auth = action.auth;
    try {

        if(auth) {
            const alerts = yield call(OrdersApi.getAccountAlerts,auth)
            console.log('Got alerts : ',alerts);
            yield put({
                type: ACCOUNT_ALERTS_LISTED,
                data: alerts
            })
        }

    } catch (e) {
        console.log('Exception getting account alerts : ',e)
    }
}

export function* addAccountAlert(action) {

    const auth = action.auth;
    try {

        const alert = yield call(OrdersApi.saveAccountAlerts,action.data,auth)

        const message = {
            life: 5000,
            severity: 'info',
            text: 'Account alert saved'
          };


        OrdersApi.waitForFiveSeconds();
        
        yield put({
            type: MESSAGE_ADD,
            data: message
          });
        
        yield put({
            type: ACCOUNT_ALERT_LIST,
            auth: auth
        });
        
        const rett = yield call(OrdersApi.waitForFiveSeconds);
        
        yield put({
            type: MESSAGE_REMOVE
          })
          

    } catch (e) {
        console.log('Exception saving account alert : ', e)
    }

}