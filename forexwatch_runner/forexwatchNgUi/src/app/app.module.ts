import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppState } from './store/State';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './util/route-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FwMaterialModule } from './material.module';
import { SettingsComponent } from './settings/settings.component';
import { AccountsComponent } from './accounts/accounts.component';
import { OrdersComponent, OrderDialog } from './orders/orders.component';
import { ConfirmDialog } from './shared/confirmDialog/confirm.dialog';
import { from } from 'rxjs';
import { AlertsComponent } from './alerts/alerts.component';
import { NotesComponent } from './notes/notes.component';
import { DailynotesComponent } from './notes/dailynotes/dailynotes.component';
import { NoteformComponent } from './notes/noteform/noteform.component';
import { PwordchangeComponent } from './pwordchange/pwordchange.component';
import { SettingsListComponent } from './settings/settingslist/settingslist.component';
import { SettingEditDialog } from './settings/settingedit/settingedit.component';
import { BotLogMessagesComponent, LogMessageDialog } from './bot-log-messages/bot-log-messages.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    AccountsComponent,
    OrdersComponent,
    AlertsComponent,
    OrderDialog,
    SettingEditDialog,
    ConfirmDialog,
    NotesComponent,
    DailynotesComponent,
    NoteformComponent,
    PwordchangeComponent,
    SettingsListComponent,
    BotLogMessagesComponent,
    LogMessageDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FwMaterialModule,
    NgxsModule.forRoot([
      AppState
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }), 
  ],
  entryComponents: [OrderDialog,ConfirmDialog, SettingEditDialog,LogMessageDialog],
  providers: [RouteGuard,{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
