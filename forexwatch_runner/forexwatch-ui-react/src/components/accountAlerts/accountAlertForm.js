import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';

export class AccountAlertForm extends React.Component {


    constructor() {
        super();


        this.state = {

            selectedAccount: '',
            accountId : '',
            minBalance : 0
        }

        this.onAccountChange = this.onAccountChange.bind(this);
        this.saveAccountAlert = this.saveAccountAlert.bind(this);
    }
    
    saveAccountAlert() {
        console.log('Selected account id : ', this.state)
        const accountAlert = { 
            accountId : this.state.accountId,
            minBalance : this.state.minBalance
        }
        this.props.saveAccountAlert(accountAlert);
    }

    onAccountChange(e) {
        console.log('Selected account : ', e.value)
        this.setState({selectedAccount: e.value, accountId: e.value.accountId});
        
    }

    render() {
        return (
            <div>
                <Card>
                <div className="content-section implementation">
                    <Dropdown optionLabel="accountName" value={this.state.selectedAccount} options={this.props.accounts} onChange={this.onAccountChange} />
                    <br/>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="number" size="30" value={this.state.minBalance} onChange={(e) => this.setState({minBalance: e.target.value})} />
                            <label htmlFor="float-input">Alert limit</label>
                    </span>
                    <br/>
                    <div className="content-section implementation">
                      <Button label="Save"  onClick={this.saveAccountAlert}/>
                    </div>
                </div>
                </Card>
            </div>
        )
    }


}