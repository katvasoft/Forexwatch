import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { AppState } from '../store/State';
import { Observable } from 'rxjs';
import { ShowFailureMessage, ChangePasswordAction } from '../store/Actions';

@Component({
  selector: 'app-pwordchange',
  templateUrl: './pwordchange.component.html',
  styleUrls: ['./pwordchange.component.css']
})
export class PwordchangeComponent implements OnInit {

  @Select(AppState.ShowSuccessMessage)
  showSuccessMessage$ : Observable<any>;

  @Select(AppState.ShowFailureMessage)
  showFailureMessage$ : Observable<any>;

  @Select(AppState.Message)
  message$ : Observable<any>;

  passwordChange = {
    'oldPassword' : null,
    'newPassword' : null
  }

  newPasswordAgain : string = null

  constructor(private store: Store) { }

  ngOnInit() {
  }

  changePassword() {

    if(this.passwordChange.newPassword === this.newPasswordAgain) {
      console.log('Password change : ',this.passwordChange)
      this.store.dispatch(new ChangePasswordAction(this.passwordChange));

    } else {
      this.store.dispatch(new ShowFailureMessage("Passwords do not match"));
    }

  }


}
