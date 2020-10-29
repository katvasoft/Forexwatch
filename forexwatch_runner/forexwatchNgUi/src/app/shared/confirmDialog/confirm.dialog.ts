import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm.dialog.html',
  })
  export class ConfirmDialog {
    
    message: any;
    successResult: boolean = true;

    constructor(
      public dialogRef: MatDialogRef<ConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        
        this.message = data.data;
        
      }
  
      close() {
        this.dialogRef.close();
      }
  }