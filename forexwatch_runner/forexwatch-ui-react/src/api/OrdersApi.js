import axios from 'axios';

export default class OrdersApi {

  //TODO: get from environment type from env variable and determine prefix with that

  static apiUrlPrefix() {
    //PROD
   //return "api";
    //TEST
   return "http://localhost:8080/forexwatch_runner/api";
  }

  static loginUrlPrefix() {
    // PROD
   //return "";
    // TEST
   return "http://localhost:8080/forexwatch_runner/";

  }

  static listStrategyNames(auth) {

    return axios.get( OrdersApi.apiUrlPrefix() + '/order/strategy/name', { headers : { 'Authorization' : auth.authHeader } });

  }

  static getOrders() {

    return axios.get( OrdersApi.apiUrlPrefix() + '/order');

  }

  static getAccountAlerts(auth) {
    return axios.get( OrdersApi.apiUrlPrefix() + '/accountAlert' ,{ headers : { 'Authorization' : auth.authHeader } } )
  }

  static saveAccountAlerts(alert, auth) {
    return axios.post(OrdersApi.apiUrlPrefix()+ '/accountAlert', JSON.stringify(alert),  {headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} } )
  }

  static removeAlert(alert, auth) {

    const uri = OrdersApi.apiUrlPrefix() + '/accountAlert/' + alert.id;

    return axios.delete(uri, { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }


  static getSettings(auth) {

    return axios.get( OrdersApi.apiUrlPrefix() + '/setting',{ headers : { 'Authorization' : auth.authHeader } } );

  }

  static getAccountSettings(accountId,auth) {
   
    return axios.get( OrdersApi.apiUrlPrefix() + '/setting/account/' + accountId,{ headers : { 'Authorization' : auth.authHeader } } );
    
  }

  static updateAccount(account, auth) {

    return axios.put(OrdersApi.apiUrlPrefix() + '/account', JSON.stringify(account), { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} })

  }

  static saveSetting(setting, auth) {

    return axios.post( OrdersApi.apiUrlPrefix() + '/setting',JSON.stringify(setting),
      { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static removeSetting(setting, auth) {

    const uri = OrdersApi.apiUrlPrefix() + '/setting/' + setting.id;

    return axios.delete(uri, { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static listAccountInfos(auth) {

    return axios.get(OrdersApi.apiUrlPrefix() + '/account', { headers : { 'Authorization' : auth.authHeader } });

  }

  static removeAccountInfo(accountInfo, auth) {

    const uri = OrdersApi.apiUrlPrefix() + '/account/' + accountInfo.id;
    return axios.delete(uri, { headers : { 'Authorization' : auth.authHeader }});

  }

  static removeOrder(orderId, auth) {

    const uri = OrdersApi.apiUrlPrefix() + '/order/delete/' + orderId;
    console.log('Remove uri : ', uri);
    return axios.delete( OrdersApi.apiUrlPrefix() + '/order/delete/' + orderId,
      { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static updateSetting(setting, auth) {

    return axios.put( OrdersApi.apiUrlPrefix() + '/setting',JSON.stringify(setting),
      { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static removeStrategy(strategy, auth) {

    return axios.delete(OrdersApi.apiUrlPrefix() + '/strategy/remove', { data : strategy ,
            headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} })

  }

  static queryOrders(query,auth) {


    console.log('queryOrders api : ', query);
    console.log('QueryOrders payload : ' ,JSON.stringify(query) );
    return axios.post( OrdersApi.apiUrlPrefix() + '/order/find/date',JSON.stringify(query),
      { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static queryLogMessages(query, auth) {

    return axios.post( OrdersApi.apiUrlPrefix() + '/log/strategy/find/date', JSON.stringify(query),
      { headers : { 'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader} });

  }

  static closeOrder(order, auth) {

    const orderId = order.orderJForexId;
    const strategyId = order.strategyJForexId;

    console.log('CloseOrder, orderId: ', orderId);
    console.log('CloseOrder, strategyId: ', strategyId);

    return axios.post(OrdersApi.apiUrlPrefix() + '/order/' + strategyId + '/' + orderId + '/close', null, { headers : { 'Authorization' : auth.authHeader } } );

  }

  static saveOrder(order, auth) {

    const url = OrdersApi.apiUrlPrefix() + '/order';

    console.log('Order save url : ', url);

    return axios.post(url, JSON.stringify(order), { headers : {'Content-Type' : 'application/json' , 'Authorization' : auth.authHeader } } );

  }

  static queryCompiledStrategies(auth) {

    return axios.get( OrdersApi.apiUrlPrefix() + '/strategy/compiled', { headers : { 'Authorization' : auth.authHeader } });

  }

  static compileJar(strategy, auth) {

    return axios.post( OrdersApi.apiUrlPrefix() + '/strategy/compile/jar', strategy, { headers : { 'Authorization' : auth.authHeader } });

  }

  static startStrategy(strategy, auth) {

    return axios.post( OrdersApi.apiUrlPrefix() + '/strategy/loadAndStart', strategy,{ headers : { 'Authorization' : auth.authHeader } });

  }

  static stopStrategy(id, auth) {

    return axios.post( OrdersApi.apiUrlPrefix() + `/strategy/${id}/stop`,null, { headers : { 'Authorization' : auth.authHeader } });

  }

  static findUploadedStrategies(auth) {

    return axios.get(OrdersApi.apiUrlPrefix() + '/strategy/undeployed/jar',{ headers : { 'Authorization' : auth.authHeader } })

  }

  static login(creds) {

    return axios.post(OrdersApi.loginUrlPrefix() + 'login',JSON.stringify(creds),
      { headers : { 'Content-Type' : 'application/json' } });

  }

  static getForexWatchStatus(auth) {


    return axios.get(OrdersApi.apiUrlPrefix() + '/strategy/status', { headers : { 'Authorization' : auth.authHeader } });

  }

  static waitForFiveSeconds() {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(true);
      },5000);
    })

  }

}
