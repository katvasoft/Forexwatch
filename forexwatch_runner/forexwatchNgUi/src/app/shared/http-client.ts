import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Config } from 'protractor';

@Injectable({
    providedIn: 'root'
  })
  export class HttpClientService {

    apiUrl = environment.backendUrl || ''
    loginUrl = environment.loginUrl || ''
    
    constructor(private http: HttpClient) { }

    login(loginDto: any) {
      console.log('Login url : ', this.loginUrl)
      return this.http.post<Config>(this.loginUrl+'login', loginDto,{ observe: 'response' });
    }

    fetchStats(token: string) {
      console.log('Fetching stats with token : ' + token)
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/order/stats', {headers});

    }

    fetchAccounts(token: string) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/account', {headers})

    }

    fetchStrategyNames(token: string) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/order/strategy/name', {headers})

    }

    addAccount(token: string, account:any) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/account',account,{headers});

    }

    updateAccount(token: string, account:any) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.put(this.apiUrl+'/account',account,{headers});

    }

    deleteAccount(token: string, accountId: string) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.delete(this.apiUrl+'/account/'+accountId, {headers})
    }

    queryOrders(token: string, payload: any) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/order/find/date', payload, {headers});
    }

    fetchAccountAlerts(token: string) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/accountAlert', {headers});
    }

    saveAccountAlert(token, payload) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/accountAlert', payload, {headers});
    }

    saveOrderComment(token: string, payload: any) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/order/comment', payload, {headers});
    }

    deleteAccountAlert(token, id) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.delete(this.apiUrl+'/accountAlert/'+ id, {headers});
    }

    deleteOrder(token, id) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.delete(this.apiUrl+'/order/'+id, {headers});
    }

    listDailyNotes(token) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/note', {headers});
    }

    saveNote(token, payload) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/note', payload, {headers});
    }

    deleteNote(token, id) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.delete(this.apiUrl+'/note/'+id, {headers});
    }

    queryNotes(token, payload) {
      
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/note/query', payload, {headers});
    }

    changePassword(token, payload) {

      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/usr/pword', payload, {headers});

    }

    queryDailyScannerNotifications(token) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/scannerNotification', {headers})
    }

    listAccountSettings(token, accountId) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/setting/account/'+ accountId, {headers});
    }

    saveSetting(token, payload) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/setting', payload, {headers})
    }

    deleteSetting(token, settingId) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.delete(this.apiUrl+'/setting/'+settingId,{headers})
    }

    listSettingGroups(token, accountId) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/setting/group/'+ accountId, {headers})
    }

    findLogEvents(token, payload) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/strategyLog', payload, {headers})
    }

    listEventTypes(token) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.get(this.apiUrl+'/strategyLog/type', {headers})
    }

    saveSubscription(token, payload) {
      const headers = new HttpHeaders().set("Authorization", token);
      return this.http.post(this.apiUrl+'/notification', payload, {headers})
    }

  }