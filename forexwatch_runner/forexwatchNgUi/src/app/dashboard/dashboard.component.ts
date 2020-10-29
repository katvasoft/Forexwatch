import { Component, OnInit } from '@angular/core';
import { Select,  Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/State';
import { FetchStatsAction, ListDailyNotesAction, QueryDailyScannerNotificationsAction,
  SaveSubscriptionInfoAction } from '../store/Actions';
import { SwPush } from '@angular/service-worker'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Select(AppState.Stats)
  stats$: Observable<any>;

  @Select(AppState.DailyNotes)
  dailyNotes$: Observable<any>;

  @Select(AppState.ScannerDailyNotifications)
  scannerDailyNotifications$: Observable<any>;

  readonly VAPID_PUBLIC_KEY = "BNBSwchfO_AVBr60-xQdhpV52Qekaf52e2LctEixAzpB8hwthe.testkey.ffdsfAfu78MoEaHYxDog";

  constructor(private store: Store, private swPush : SwPush) { }

  ngOnInit() {
    this.store.dispatch(new FetchStatsAction())
    this.store.dispatch(new ListDailyNotesAction());
    this.store.dispatch(new QueryDailyScannerNotificationsAction());
    this.subscribeNotifications();
    
  }

  subscribeNotifications() {
    console.log('Subscribing to notifications..')
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
  })
  .then(sub => {
    console.log('Subscription : ', sub)
    const subJson = sub.toJSON()
    const accountNot = {
      notEndpoint : subJson.endpoint,
      key256dh : subJson.keys.p256dh,
      keyAuth: subJson.keys.auth
    }
    this.store.dispatch(new SaveSubscriptionInfoAction(accountNot));
  })
  .catch(err => console.error("Could not subscribe to notifications", err));
  }

}
