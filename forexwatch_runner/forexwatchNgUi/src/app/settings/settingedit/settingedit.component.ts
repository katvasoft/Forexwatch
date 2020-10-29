import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
    selector: 'setting-dialog',
    templateUrl: 'settingedit.component.html',
    styleUrls: ['./settingedit.component.css']
  })
  export class SettingEditDialog {
    
    setting: any;
    
    settingGroups$ : Observable<any>;

    newSettingGroup: Boolean = false;

    constructor(
      public dialogRef: MatDialogRef<SettingEditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        
        this.setting = data.data;
        this.settingGroups$ = data.settingGroups;
        
      }
  
      close() {
        this.dialogRef.close();
      }
  }