import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';

import { LoginAction } from '../store/Actions';

import { Observable } from 'rxjs';
import { AppState } from '../store/State';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  showFailureMessage: boolean = false;

 

  constructor(private store: Store) { }

  ngOnInit() {
  }

  login()
  {
    const loginDto = {
      username: this.username,
      password: this.password
    }
    this.store.dispatch(new LoginAction(loginDto))
  }

}
