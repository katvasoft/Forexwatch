import React from 'react';
import { connect } from "react-redux";
import { OrderSearchComponent } from './orderSearchComponent';
import { OrderResultTable } from './orderResultTable';
import { QUERY_ORDERS } from '../../sagas/actionTypes';

export class OrderQueryPageComponent extends React.Component {


    constructor() {
        super();
        this.loadOrders = this.loadOrders.bind(this)
    }

    loadOrders(query) {
        console.log('Got query : ', query)
        const orderQuery = {
            fromDate: query.fromDate,
            toDate: query.toDate,
            accountId: query.accountId
        }

        if(this.props.auth) {
            
            this.props.dispatch({
              type : QUERY_ORDERS,
              auth: this.props.auth,
              data: orderQuery
            })
          }
    }

    render() {
        return(
            <div>
                <OrderSearchComponent loadOrders={this.loadOrders} accounts={this.props.accounts}></OrderSearchComponent>
                <br/>
                <OrderResultTable orders={this.props.orders}/>
            </div>
        )
    }
    
}

function mapStateToProps(state) {

    
    return {
  
      auth: state.authStatus || {},
      accounts: state.accounts|| [],
      message: state.message || {},
      orders : state.orders || []

    };
}
OrderQueryPageComponent = connect(mapStateToProps)(OrderQueryPageComponent);
export default OrderQueryPageComponent;