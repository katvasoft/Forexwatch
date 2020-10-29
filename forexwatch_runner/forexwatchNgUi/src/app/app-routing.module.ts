import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NotesComponent } from './notes/notes.component';
import { PwordchangeComponent } from './pwordchange/pwordchange.component';
import { SettingsComponent } from './settings/settings.component';
import { BotLogMessagesComponent } from './bot-log-messages/bot-log-messages.component';
import { RouteGuard } from './util/route-guard';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard]},
  { path: 'accounts', component: AccountsComponent, canActivate: [RouteGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [RouteGuard]},
  { path: 'alerts', component: AlertsComponent, canActivate: [RouteGuard]},
  { path: 'notes', component: NotesComponent, canActivate: [RouteGuard]},
  { path: 'pwordchange', component: PwordchangeComponent, canActivate: [RouteGuard]},
  { path: 'strategylogs', component: BotLogMessagesComponent, canActivate: [RouteGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
