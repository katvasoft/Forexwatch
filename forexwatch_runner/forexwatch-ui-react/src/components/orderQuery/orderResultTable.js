import React from 'react'
import { connect } from "react-redux";
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';

function mapStateToProps(state) {

    
    return {
  
      auth: state.authStatus || {}

    };
}

export const OrderResultTable = (props) => {

    const { orders } = props
    
    if (orders && Array.isArray(orders) && orders.length > 0) {
        return <DataTable value={orders}>
                 <Column field="orderLabel" header="Order label"/>
                 <Column field="orderType" header="Order type"/>
                 <Column field="orderInstrument" header="Instrument"/>
                 <Column field="orderProfitLoss" header="Profit/Loss"/>
                 <Column field="orderProfitLossPips" header="Profit/Loss pips"/>
               </DataTable>
    } else {
        return <div></div>
    }

}