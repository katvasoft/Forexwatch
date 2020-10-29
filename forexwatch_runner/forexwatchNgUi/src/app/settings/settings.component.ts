import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import {MatDialog} from '@angular/material/dialog';
import { SettingEditDialog } from './settingedit/settingedit.component';
import { ConfirmDialog } from '../shared/confirmDialog/confirm.dialog';
import { ListAccountSettingsAction, FetchAccountsAction, SaveSettingAction, 
          DeleteSettingAction, ListAccountSettingGroups } from '../store/Actions'; 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$: Observable<boolean>;

  @Select(AppState.Message)   
  message$: Observable<string>;

  @Select(AppState.Settings)
  settings$: Observable<any>;

  @Select(AppState.Accounts)
  accounts$: Observable<any>;

  @Select(AppState.SettingGroups)
  settingGroups$: Observable<any>;

  selectedAccount: any;

  constructor(private store: Store, public dialog : MatDialog) { }

  ngOnInit() {
    this.store.dispatch(new FetchAccountsAction());
  }

  onAccountChange(account: any) {
    if(account) {
      this.store.dispatch(new ListAccountSettingGroups(account));
    }
  }

  listAccountSettings() {
    if(this.selectedAccount) {
      this.store.dispatch(new ListAccountSettingsAction(this.selectedAccount));
    }
  }

  editSetting(setting) {
    this.showDialog(setting);
  }

  deleteSetting(setting) {
    

    const confirmDialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {data: 'Setting delete. Are you sure ?'}
    });
    
    confirmDialogRef.afterClosed().subscribe(result => {
      
      if(result) {
        this.store.dispatch(new DeleteSettingAction(setting.id))
      }
    })
  }

  addSetting() {
    let setting = {}
    this.showDialog(setting)
  }

  showDialog(setting) {
    const dialogRef = this.dialog.open(SettingEditDialog, {
      width: '600px',
      data: {data : setting, settingGroups: this.settingGroups$}
    })

    dialogRef.afterClosed().subscribe(result => {
      
      result.settingAccountId = this.selectedAccount;
      this.store.dispatch(new SaveSettingAction(result));
    })
  }

}
