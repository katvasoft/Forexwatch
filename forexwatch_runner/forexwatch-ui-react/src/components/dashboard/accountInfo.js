import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';

export class AccountInfoComponent extends React.Component {

    constructor() {
        super();

        this.editAccount = this.editAccount.bind(this);
    }

    editAccount() {
        this.props.editAccount(this.props.account);
    }

    render() {
        const {account} = this.props;
        return (<Card header={account.accountName}>
                    <p><b>Equity : </b> {account.accountEquity} </p>
                    <p><b>Balance : </b> {account.accountBalance} </p>
                    <br/>
                    <Button label="Edit"  onClick={this.editAccount}/>
                </Card>

                )
    }
}