import React from 'react';
import { connect } from "react-redux";
import { LIST_SETTINGS,FETCH_ACCOUNTS, LIST_ACCOUNT_SETTINGS, SAVE_SETTING} from '../../sagas/actionTypes';
import {SettingsView} from './settingView'
import { SettingEditForm } from './settingEditForm'
import {MessageComponent} from '../notification/notificationComponent';
import {Dropdown} from 'primereact/dropdown';

export class SettingsPage extends React.Component {

    constructor() {
        super();
        this.fetchSettings = this.fetchSettings.bind(this);
        this.fetchAccounts = this.fetchAccounts.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.fetchAccountSettings = this.fetchAccountSettings.bind(this);
        this.saveSetting = this.saveSetting.bind(this);
        
        this.state = {
            selectedAccount: '',
            selectedAccountId: ''
        }
    }

    componentDidMount() {
        this.fetchSettings()
        this.fetchAccounts()
    }

    fetchSettings() {
        if(this.props.auth) {
            
            this.props.dispatch({
              type : LIST_SETTINGS,
              auth: this.props.auth
            })
          }
    }

    fetchAccounts() {
        if(this.props.auth) {
            this.props.dispatch({
                type: FETCH_ACCOUNTS,
                auth: this.props.auth
            })
        }
    }

    saveSetting(setting) {
        this.props.dispatch({
            type: SAVE_SETTING,
            auth: this.props.auth,
            data: setting
            })
    }

    fetchAccountSettings(accountId) {
        if(this.props.auth) {
            this.props.dispatch({
                type: LIST_ACCOUNT_SETTINGS,
                auth: this.props.auth,
                data: accountId
            })
        }
    }

    onAccountChange(e) {
        
        this.setState({selectedAccount: e.value, selectedAccountId: e.value.accountId});
        this.fetchAccountSettings(e.value.accountId);
    }
 
    render() {
        
        return (
            <div>
                
                <Dropdown optionLabel="accountName" value={this.state.selectedAccount} options={this.props.accounts} onChange={this.onAccountChange} />
                <MessageComponent notification={this.props.message} />
                <SettingsView settings={this.props.settings}/>
                <SettingEditForm accountId={this.state.selectedAccountId} saveSetting={this.saveSetting} />
            </div>
        );
    }
    
}

function mapStateToProps(state) {

    
    return {
  
      auth: state.authStatus || {},
      accounts: state.accounts|| [],
      settings: state.settings || [],
      message: state.message || {}
    };
}

const SettingsPageComponent = connect(mapStateToProps)(SettingsPage);
export default SettingsPageComponent;