import { Component, OnInit, Inject } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialog } from '../shared/confirmDialog/confirm.dialog';
import { FetchAccountsAction, QueryOrdersAction, FetchStrategyNamesAction, 
         UpdateOrderCommentAction, DeleteOrderAction } from '../store/Actions'; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private store: Store, public dialog: MatDialog) { }

  @Select(AppState.Accounts)
  accounts$: Observable<any>;

  @Select(AppState.Orders)
  orders$: Observable<any>;
  
  @Select(AppState.OrdersSum)
  sum$: Observable<number>;

  @Select(AppState.OrdersPipSum)
  pipSum$: Observable<number>;

  @Select(AppState.StrategyNames)
  strategyNames$: Observable<any>;

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$: Observable<boolean>;

  @Select(AppState.Message)   
  message$: Observable<string>;

  orderQuery = {
    accountId: null,
    fromDate: null,
    toDate: null,
    strategyName: null
  }

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction());
    this.store.dispatch(new FetchStrategyNamesAction());
  }

  queryOrders() {
    
    this.store.dispatch(new QueryOrdersAction(this.orderQuery));
   
  }

  showOrderDetails(order: any) {
    const dialogRef = this.dialog.open(OrderDialog, {
      width: '450px',
      data: {data: order}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        console.log('Got result : ', result)
        const orderComment = {
          'orderId': order.id,
          'orderComment': result
        }
        console.log('Order comment : ', orderComment)
        this.store.dispatch(new UpdateOrderCommentAction(orderComment))
      }
      
    });
  }

  deleteOrder(order:any) {
    const confirmDialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {data: 'Order delete. Are you sure ?'}
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      console.log('GOT : ', result);
      
      if(result) {
        console.log('Order id : ', order.id)
        this.store.dispatch(new DeleteOrderAction(order.id))
      }
    })
    


  }

  clear() {
    this.orderQuery = {
      accountId: null,
      fromDate: null,
      toDate: null,
      strategyName: null
    }
  }

}

@Component({
  selector: 'order-dialog',
  templateUrl: 'order.dialog.component.html',
})
export class OrderDialog {
  
  order: any;
  constructor(
    public dialogRef: MatDialogRef<OrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.order = data.data;
      console.log('Order: ', this.order)
    }

    close() {
      this.dialogRef.close();
    }
}
