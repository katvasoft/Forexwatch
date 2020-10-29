import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import { FetchAccountsAction, SaveAccountAction, DeleteAccountAction } from '../store/Actions'; 

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private store: Store) { }

  @Select(AppState.Accounts)
  accounts$: Observable<any>;

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$: Observable<boolean>;

  @Select(AppState.Message)   
  message$: Observable<string>;

  showEdit: boolean = false;

  selectedAccount = {
    'accountId': null,
    'accountName': '',
    'accountEquity': 0,
    'accountBalance': 0,
    'accountInitialBalance': 0,
    'accountComment' :'',
    'accountType' : '',
    'apiKey': ''
  }

  accountTypes: ['DEMO', 'LIVE']

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction());
  }

  editAccount(account: any) {
    this.selectedAccount = account;
    this.showEdit = true;
  }

  newAccount() {
    this.showEdit = true;
    this.selectedAccount = {
      'accountId': null,
      'accountName': '',
      'accountEquity': 0,
      'accountBalance': 0,
      'accountInitialBalance': 0,
      'accountComment' :'',
      'accountType' : '',
      'apiKey': ''
    }
  }

  cancel() {
    this.showEdit = false;
  }

  save() {
    this.store.dispatch(new SaveAccountAction(this.selectedAccount))
    this.showEdit = false;  
  }

  delete() {
    this.store.dispatch(new DeleteAccountAction(this.selectedAccount.accountId));
    this.showEdit = false;
  }

}
