import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import DashBoardPageComponent from './components/dashboard/dashBoardPage';
import LoginFormComponent  from './components/login/loginForm'
import SettingsPageComponent from './components/settings/settingsPage'
import OrderQueryPageComponent from './components/orderQuery/orderQueryPage';
import AccountAlertsPageComponent from './components/accountAlerts/accountAlertsPage';
import {NavBar} from './components/util/navbar';
import {  Route, Switch } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App(props) {
  return (
   <div>
     <NavBar auth={props.auth}></NavBar>
     <div className="container">
     <Switch>
        <Route path="/" component={LoginFormComponent} exact />
        <Route path="/dashboard" component={DashBoardPageComponent} />
        <Route path="/settings" component={SettingsPageComponent} />
        <Route path="/orders" component={OrderQueryPageComponent}/>
        <Route path="/accountalerts" component={AccountAlertsPageComponent}/>
    </Switch>
    </div>
   </div>
    

  );
}

function mapStateToProps(state) {

    
  return {

    auth: state.authStatus || {}
  };
}

App = connect(mapStateToProps)(App);

export default App;
