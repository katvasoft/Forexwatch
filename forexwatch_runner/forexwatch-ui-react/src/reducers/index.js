import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import login from './login';

import listAccounts from './accounts';
import listSettings from './listSetting';
import selectAccount from './selectedAccount';
import accountAlerts from './accountAlerts';
import orders from './orders';
import message from './message';


// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  authStatus : login,
  settings : listSettings,
  accounts : listAccounts,
  selectedAccount: selectAccount,
  message : message,
  orders : orders,
  accountAlerts: accountAlerts
  
});
