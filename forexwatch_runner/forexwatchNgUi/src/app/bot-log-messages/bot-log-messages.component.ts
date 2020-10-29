import { Component, OnInit,Inject } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { AppState } from '../store/State';
import { Observable } from 'rxjs';
import { FetchAccountsAction,  FetchStrategyNamesAction, FindLogEventsAction,ListLogEventTypesAction
   } from '../store/Actions'; 

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-bot-log-messages',
  templateUrl: './bot-log-messages.component.html',
  styleUrls: ['./bot-log-messages.component.css']
})
export class BotLogMessagesComponent implements OnInit {

  
  @Select(AppState.Accounts)
  accounts$: Observable<any>;

  @Select(AppState.StrategyNames)
  strategyNames$: Observable<any>;

  @Select(AppState.EventLogs)
  eventLogs$: Observable<any>;

  @Select(AppState.EventLogTypes)
  eventLogTypes$: Observable<any>;

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$: Observable<boolean>;

  @Select(AppState.Message)   
  message$: Observable<string>;

  query = {
    accountId: null,
    fromDate: null,
    toDate: null,
    strategyName: null,
    logEventType: null
  }

  constructor(private store: Store,public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction());
    this.store.dispatch(new FetchStrategyNamesAction());
    this.store.dispatch(new ListLogEventTypesAction());
  }

  queryLogs() {
    this.store.dispatch(new FindLogEventsAction(this.query));
  }

  showLogDetails(log:any) {
    const dialogRef = this.dialog.open(LogMessageDialog, {
      width: '450px',
      data: {data: log}
    });

  }

  clear() {
    this.query = {
      accountId: null,
      fromDate: null,
      toDate: null,
      strategyName: null,
      logEventType: null
    }
  }

}

@Component({
  selector: 'log-dialog',
  templateUrl: 'bot-log-message-dialog.html',
})
export class LogMessageDialog {
  
  log: any;
  constructor(
    public dialogRef: MatDialogRef<LogMessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.log = data.data;
      
    }

    close() {
      this.dialogRef.close();
    }
}