import { call, put } from "redux-saga/effects";
import OrdersApi from '../api/OrdersApi';
import {QUERY_STATUS, LOAD_JARS, LIST_COMPILED_STRATEGIES_SAGA} from "./actionTypes";
import { LIST_COMPILED_STRATEGIES, STRATEGY_STARTED, LOADED_JARS, JAR_COMPILED, LOG_MESSAGE_LIST } from '../reducers/actionTypes';

export function* listCompiledStrategies(action) {

  const auth = action.auth;

  if(auth) {

    try {
      const compiledStrategies = yield call (OrdersApi.queryCompiledStrategies, auth);

      console.log('GOT COMPILED STRATEGIES : ', compiledStrategies);

      yield put({
        type : LIST_COMPILED_STRATEGIES,
        compiledStrategies : compiledStrategies.data
      });
    } catch  (e) {

      console.log('Got exception compiling strategies : ', e);

    }

  }



}

export function* startStrategy (action) {

  const auth = action.auth;

  const startedStrategy = yield call(OrdersApi.startStrategy, action.data, auth);

  yield put({
    type: STRATEGY_STARTED,
    startedStrategy: startedStrategy
  });

}

export function* removeStrategy (action) {

  const auth = action.auth;

  const tmp = yield call(OrdersApi.removeStrategy, action.data, auth);

  yield put ( { type : LOAD_JARS, auth : auth } );

  yield put( {type: LIST_COMPILED_STRATEGIES_SAGA , auth : auth} );

}

export function* stopStrategy(action) {

  const auth = action.auth;

  const stoppedStrategy = yield call(OrdersApi.stopStrategy, action.data, auth);

  const ret = yield call(OrdersApi.waitForFiveSeconds);

  yield put({type: QUERY_STATUS , auth : auth});


}

export function* loadJars(action) {

  const auth = action.auth;
  if(auth) {

    try {

      const response = yield call(OrdersApi.findUploadedStrategies, auth);

      console.log('GOT RESPONSE: ', response);

      yield put({
        type : LOADED_JARS,
        jars : response.data
      });

    } catch (e) {

      console.log('GOT EXCEPTION FROM LOAD JARS : ', e);
    }

  }

}

export function* compileJar (action) {

  const auth = action.auth;

  if(auth) {

    try {

      const response = yield call(OrdersApi.compileJar, action.data, auth);

      console.log('GOT RESPONSE FROM COMPILE JAR : ', response);

      yield put({

        type : JAR_COMPILED,
        data : response.data

    });

    } catch (e) {

      console.log('GOT EXCEPTION FROM COMPILE JAR : ', e)
    }

  }

}

export function* queryLogMessages (action) {

  const auth = action.auth;

  if(auth) {

    try {

      const response = yield call(OrdersApi.queryLogMessages, action.data, auth);

      yield put({
        type : LOG_MESSAGE_LIST,
        logMessages : response.data
      });

    } catch (e) {

      console.error('EXCEPTION OCCURRED WHEN QUERYING LOG MESSAGES : ', e);

    }

  }

}
