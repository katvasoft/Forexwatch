import React from 'react';
import { connect } from "react-redux";
import { ACCOUNT_ALERT_ADD, ACCOUNT_ALERT_LIST } from '../../sagas/actionTypes';
import { AccountAlertForm } from './accountAlertForm';
import {MessageComponent} from '../notification/notificationComponent';

class AccountAlertsPage extends React.Component {

    constructor() {
        super();
        this.saveAccountAlert = this.saveAccountAlert.bind(this);

    }

    saveAccountAlert(alert) {
        if(this.props.auth) {
            this.props.dispatch({
                type: ACCOUNT_ALERT_ADD,
                auth: this.props.auth,
                data: alert
            });
        }
    } 

    render() {
        return (
            <div>
                <MessageComponent notification={this.props.message} />
                <br/>
                <AccountAlertForm saveAccountAlert={this.saveAccountAlert} accounts={this.props.accounts}></AccountAlertForm>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        auth: state.authStatus || {},
        message: state.message || {},
        accounts: state.accounts|| [],
        accountAlerts: state.accountAlerts || [ ]
    }
}

const AccountAlertsPageComponent = connect(mapStateToProps)(AccountAlertsPage);
export default AccountAlertsPageComponent;