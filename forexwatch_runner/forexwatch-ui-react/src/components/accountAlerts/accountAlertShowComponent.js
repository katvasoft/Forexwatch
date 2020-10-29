import React from 'react'
import {Card} from 'primereact/card';
import AccountAlertsPageComponent from './accountAlertsPage';

export const AccountAlertsPageComponent = (props) => {

    const {accountAlert} = props

    return <div>
        <Card title={accountAlert.accountName}>
            <p>{accountAlert.minBalance}</p>
        </Card>
    </div>

}