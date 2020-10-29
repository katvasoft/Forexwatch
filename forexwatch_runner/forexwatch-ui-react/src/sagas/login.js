import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';
import {LOGIN_SUCCESFUL, LOGIN_UNSUCCESFUL} from '../reducers/actionTypes';

export function* loginToForexwatch(action) {

  console.log('CALLING LOGIN ENDPOINT!');

  try {
    const loginResult = yield call(OrdersApi.login,action.data);

    console.log('Got login result : ', loginResult);

    if(loginResult.headers.authorization) {

      console.log('Successfully authenticated');
      console.log('Login data : ', loginResult)
      const authResult = {
        authenticated: true,
        authHeader : loginResult.headers.authorization,
        loginFailed: false
      };

      yield put({
        type: LOGIN_SUCCESFUL,
        data: authResult
      });

    }

  } catch (error) {

    console.log('Exception occurred when logging in : ', error);
    const authResult = {
      authenticated: false,
      authHeader : null,
      loginFailed : true
    };

    yield put({
      type: LOGIN_UNSUCCESFUL,
      data: authResult
    });

  }


}
