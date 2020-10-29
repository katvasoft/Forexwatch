import React from 'react';
import { AccountInfoComponent } from './accountInfo';

export class DashBoardComponent extends React.Component {

    mapAccounts(accounts) {
        console.log(accounts)
        if (accounts && Array.isArray(accounts)) {
            return accounts.map((accountInfo) => <AccountInfoComponent editAccount={this.props.editAccount} key={accountInfo.accountId} account={accountInfo}></AccountInfoComponent>)
        }
        else {
            return <div></div>
        }
    }

    render() 
        {
        const {accounts} = this.props;
        return (<div>
                    <div className="p-grid">
                        <div className="p-col"></div>
                        <div className="p-col"><h3>Forexwatch</h3></div>
                        <div className="p-col"></div>
                    </div>
                    <div className="p-grid">
                    <div className="content-section implementation">
                        {
                            this.mapAccounts(accounts)
                        }
                    </div>
                    </div>
                </div>
                )
    }
}