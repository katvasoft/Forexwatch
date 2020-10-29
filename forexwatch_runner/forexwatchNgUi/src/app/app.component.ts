import { Component, OnInit } from '@angular/core';
import { AppState } from './store/State';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LogOutAction } from './store/Actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forexwatchNgUi';

  constructor(private store: Store) { }

  

  @Select(AppState.IsUserLoggedIn)
  loggedIn$: Observable<any>;

  logOut() {
    this.store.dispatch(new LogOutAction())
  }

  ngOnInit() {

  }
}
