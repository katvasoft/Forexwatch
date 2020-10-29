import React from 'react'
import {AccountAlertsPageComponent} from './AccountAlertsPageComponent'

export const SettingsView = (props) => {
    const { accountAlerts } = props
    
    if(accountAlerts && Array.isArray(accountAlerts)) {
        return accountAlerts.map( (alert) => <AccountAlertsPageComponent key={setting.id} accountAlert={alert}/> )
    } else {
        return <div></div>
    }
    

} 