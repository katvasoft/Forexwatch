import React from 'react';

import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export class AccountEditForm extends React.Component {

    constructor(props) {
        super(props);
        console.log('Props : ', props)
        this.state = {
            accountName: props.account.accountName ? props.account.accountName : '',
            accountBalance: props.account.accountBalance ? props.account.accountBalance: 0,
            accountInitialBalance: props.account.accountInitialBalance ? props.account.accountInitialBalance :  0,
            accountType:  props.account.accountType ? props.account.accountType : '',
            accountComment: props.account.accountComment ? props.account.accountComment : ''
        }
        this.saveAccount = this.saveAccount.bind(this);
    }

    componentDidMount() {
        
    }

    saveAccount() {
        const account = Object.assign({}, this.props.account)
        account.accountBalance = this.state.accountBalance;
        account.accountInitialBalance = this.state.accountInitialBalance;
        account.accountType = this.state.accountType;
        account.accountComment = this.state.accountComment;
        console.log('Saving account : ', account);
        this.props.save(account);
    }

    render() {
        return (
            <div>
                <Card>
                <div className="content-section implementation">
                    <br/>
                <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.accountName} onChange={(e) => this.setState({accountName: e.target.value})} />
                            <label htmlFor="float-input">Account name</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.accountBalance} onChange={(e) => this.setState({accountBalance: e.target.value})} />
                            <label htmlFor="float-input">Account balance</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.accountInitialBalance} onChange={(e) => this.setState({accountInitialBalance: e.target.value})} />
                            <label htmlFor="float-input">Account initial balance</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.accountType} onChange={(e) => this.setState({accountType: e.target.value})} />
                            <label htmlFor="float-input">Account type</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.accountComment} onChange={(e) => this.setState({accountComment: e.target.value})} />
                            <label htmlFor="float-input">Account comment</label>
                    </span>
                    <br/>
                    <div className="content-section implementation">
                      <Button label="Save"  onClick={this.saveAccount}/>
                      <Button label="Cancel" onClick={this.props.cancel}/>
                    </div>
                </div>
                </Card>
            </div>
        )
    }

    
}