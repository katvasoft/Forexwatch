import React from 'react';
import { DashBoardComponent } from './dashboard';
import { AccountEditForm } from './accountEdit';
import { FETCH_ACCOUNTS, UPDATE_ACCOUNT } from '../../sagas/actionTypes';
import { ACCOUNT_EDIT } from '../../reducers/actionTypes';
import { connect } from "react-redux";
import {Button} from 'primereact/button';
import {MessageComponent} from '../notification/notificationComponent';
import {  Redirect } from 'react-router-dom';

export class DashBoardPage extends React.Component {

    constructor() {
        super();
        this.fetchAccounts = this.fetchAccounts.bind(this);
        this.goToSettings = this.goToSettings.bind(this);
        this.goToOrders = this.goToOrders.bind(this);
        this.editAccount = this.editAccount.bind(this);
        this.renderAccountEdit = this.renderAccountEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.saveAccount = this.saveAccount.bind(this);
        this.state = {
          showEdit: false
        }
    }

    componentDidMount() {
      this.fetchAccounts()
    }

    goToSettings() {
      console.log('Go to settings : ', this.props.auth)
      if(this.props.auth.authenticated) {
        this.props.history.push('/settings');
        
      }
    }

    goToOrders() {
      if(this.props.auth.authenticated) {
        this.props.history.push('/orders');
        
      }
    }

    renderAccountEdit() {
      console.log('Selected account : ', this.props)
      if(this.state.showEdit && this.props.selectedAccount) {
        return <AccountEditForm save={this.saveAccount} cancel={this.cancelEdit} account={this.props.selectedAccount} />
      } else {
        return <div></div>
      }
    }

    fetchAccounts() {
      if(this.props.auth) {
        console.log('Auth :', this.props.auth)
        this.props.dispatch({
          type : FETCH_ACCOUNTS,
          auth: this.props.auth
        })
      }
    }

    editAccount(account) {
   
      this.setState({showEdit: true})
      this.props.dispatch({
        type: ACCOUNT_EDIT,
        data: account
      })
      

    }

    saveAccount(account) {
      this.props.dispatch({
        type: UPDATE_ACCOUNT,
        auth: this.props.auth,
        data: account
      })
    }
    
    cancelEdit() {
      this.setState({showEdit: false})
    }
  
    render() {
      
        return (<div>
          
                    <DashBoardComponent accounts={this.props.accounts} editAccount={this.editAccount}></DashBoardComponent>
                    <MessageComponent notification={this.props.message} />
                    <Button label="Click" onClick={this.fetchAccounts}/>
                    <Button label="To settings" onClick={this.goToSettings}/>
                    <Button label="To orders" onClick={this.goToOrders}/>
                    {
                      this.renderAccountEdit()
                    }
                </div>
                )
    }
}

function mapStateToProps(state) {

    
    return {
  
      auth: state.authStatus || {},
      accounts: state.accounts,
      selectedAccount: state.selectedAccount,
      message: state.message || {}
    };
}

const DashBoardPageComponent = connect(mapStateToProps)(DashBoardPage)
export default DashBoardPageComponent;