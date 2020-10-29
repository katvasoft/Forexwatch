import React from 'react';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';

export class OrderSearchComponent extends React.Component {

    constructor(){
        super();
        this.queryOrders = this.queryOrders.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);

        this.state = {
            
            fromDate: new Date(),
            toDate: new Date(),
            accountId: '',
            selectedAccount: ''
            
        }
    }

    queryOrders() {
        this.props.loadOrders(this.state);
    }

    onAccountChange(e) {
        this.setState({selectedAccount: e.value, accountId: e.value.accountId});
        
    }

    render() {
        return (
            <div>
                <Dropdown optionLabel="accountName" value={this.state.selectedAccount} options={this.props.accounts} onChange={this.onAccountChange} />
                <br/>
                <Calendar value={this.state.fromDate} onChange={(e) => this.setState({fromDate: e.target.value})} showIcon={true} />
                <br/>
                <Calendar value={this.state.toDate} onChange={(e) => this.setState({toDate: e.target.value})} showIcon={true} />
                <br/>
                <Button label="Query"  onClick={this.queryOrders}/>
            </div>
        );
    }

}