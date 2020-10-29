import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import {  FetchAccountAlertsAction, DeleteAccountAlertAction, SaveAccountAlertAction,
          FetchStrategyNamesAction, 
          FetchAccountsAction} from '../store/Actions'; 

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(AppState.Accounts)
  accounts$: Observable<any>;

  @Select(AppState.AccountAlerts)
  accountAlerts$: Observable<any>;

  @Select(AppState.StrategyNames)
  strategyNames$: Observable<any>;

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$: Observable<boolean>;

  @Select(AppState.Message)   
  message$: Observable<string>;

  showEdit: boolean = false;


  selectedAlert = {
    'id': null,
    'accountId': null,
    'accountName': '',
    'strategyId': null,
    'strategyName': null,
    'minBalance' :0,
    'strategyDaysToCheck': null
  }

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction())
    this.store.dispatch(new FetchAccountAlertsAction())
    this.store.dispatch(new FetchStrategyNamesAction())
  }

  newAccountAlert() {

    this.showEdit = true;
    this.selectedAlert = {
      'id': null,
      'accountId': null,
      'accountName': '',
      'strategyId': null,
      'strategyName': null,
      'minBalance' :0,
      'strategyDaysToCheck': null
    }

  }

  editAlert(alert: any) {
    this.showEdit = true;
    this.selectedAlert = alert;
  }

  save() {
    console.log('Saving alert : ', this.selectedAlert)
    this.store.dispatch(new SaveAccountAlertAction(this.selectedAlert))
    this.showEdit = false;
  }

  cancel() {
    this.showEdit = false;
  }

  delete() {
    if(this.selectedAlert.id) {
      this.store.dispatch(new DeleteAccountAlertAction(this.selectedAlert.id))
      this.showEdit = false;
    }
  }

}
