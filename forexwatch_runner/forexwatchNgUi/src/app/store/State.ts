import { State, Action, StateContext, Selector, Store, Select } from "@ngxs/store";
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpClientService } from '../shared/http-client'

import {LoginAction, ShowFailureMessage, ShowSuccessMessage, LogOutAction,
  FetchStatsAction, FetchAccountsAction, SaveAccountAction, DeleteAccountAction,
  QueryOrdersAction, FetchStrategyNamesAction, FetchAccountAlertsAction,
  SaveAccountAlertAction, DeleteAccountAlertAction, UpdateOrderCommentAction,
  DeleteOrderAction, SaveNoteAction, DeleteNoteAction, ListDailyNotesAction,
  QueryNotesAction, ChangePasswordAction, QueryDailyScannerNotificationsAction,
  ListAccountSettingsAction, SaveSettingAction, DeleteSettingAction, ListAccountSettingGroups,FindLogEventsAction,
  ListLogEventTypesAction, SaveSubscriptionInfoAction } from './Actions';
import { isArray } from 'util';



const startSpinner = (patchState) => {

    patchState({ loading: true });
    return () => {
      
      patchState({ loading: false });
    };
  };

export class StateModel {
    loggedIn: boolean;
    showFailureMessage: boolean;
    showSuccessMessage: boolean;
    accounts: any;
    message: string;
    token: string;
    loggedUser: string;
    loading: boolean;
    stats: any;
    orders: any;
    ordersSum: number;
    ordersPipSum: number;
    strategyNames: any;
    accountAlerts: any;
    orderQuery: any;
    notes: any;
    dailyNotes: any;
    noteQuery: any;
    scannerDailyNotifications: any;
    settings: any;
    selectedAccount: any;
    settingGroups: any;
    eventLogs: any;
    eventLogTypes: any;
}
@State<StateModel>({
    name: "appstate",
    defaults: {
        loggedIn: false,
        showFailureMessage: false,
        showSuccessMessage: false,
        accounts: null,
        message: null,
        token: null,
        loggedUser: null,
        stats: null,
        loading: false,
        orders: null,
        ordersSum: 0,
        ordersPipSum: 0,
        strategyNames: null,
        accountAlerts: null,
        orderQuery: null,
        notes: null,
        dailyNotes: null,
        noteQuery: null, 
        scannerDailyNotifications: null,
        settings: null, 
        selectedAccount: null,
        settingGroups: null,
        eventLogs: null,
        eventLogTypes: null
    }
})

export class AppState {

    constructor(private httpClient: HttpClientService, private zone: NgZone, private router: Router) {}

    @Selector()
    public static IsUserLoggedIn(state: StateModel) {
  
      return state.loggedIn;
  
    }

    @Selector()
    public static Stats(state: StateModel) {
      
      return state.stats;
    }

    @Selector()
    public static Accounts(state: StateModel) {

      return state.accounts;
    }

    @Selector()
    public static ShowSuccessMessage(state: StateModel) {
      return state.showSuccessMessage;
    }

    @Selector()
    public static ShowFailureMessage(state: StateModel) {
      return state.showFailureMessage;
    }

    @Selector()
    public static Message(state: StateModel) {
      return state.message;
    }

    @Selector()
    public static Orders(state: StateModel) {
      return state.orders;
    }

    @Selector()
    public static OrdersSum(state: StateModel) {
      return state.ordersSum;
    }

    @Selector() 
    public static OrdersPipSum(state: StateModel) {
      return state.ordersPipSum;
    }

    @Selector()
    public static StrategyNames(state: StateModel) {
      return state.strategyNames;
    }

    @Selector()
    public static AccountAlerts(state: StateModel) {
      return state.accountAlerts;
    }

    @Selector()
    public static DailyNotes(state: StateModel) {
      return state.dailyNotes;
    }

    @Selector()
    public static ScannerDailyNotifications(state: StateModel) {
      return state.scannerDailyNotifications;
    }

    @Selector()
    public static Settings(state: StateModel) {
      return state.settings;
    }

    @Selector()
    public static SettingGroups(state: StateModel) {
      return state.settingGroups;
    }

    @Selector()
    public static EventLogs(state: StateModel) {

      return state.eventLogs;

    }

    @Selector()
    public static EventLogTypes(state: StateModel) {
      
      return state.eventLogTypes;

    }

    @Action(LoginAction)
    login(ctx : StateContext<StateModel>, { payload }: LoginAction) {
        const cancel = startSpinner(ctx.patchState);
        this.httpClient.login(payload)
        .pipe(
            tap(data => {
           
                ctx.patchState({loggedIn: true, token: data.headers.get('authorization')})
                this.zone.run(() => {
                    this.router.navigate(['dashboard']);
                  });
            }),
            catchError(this.handleError<any>("login",ctx))
        ).subscribe().add(cancel);
    }

    @Action(LogOutAction)
    logout(ctx : StateContext<StateModel>) {
      ctx.patchState({ token: null, loggedIn: false });
      this.zone.run(() => {
        this.router.navigate(['']);
      });
    }

    @Action(FetchAccountsAction)
    fetchAccounts(ctx : StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.fetchAccounts(ctx.getState().token)
      .pipe(
        tap(data => {
            ctx.patchState({accounts: data})
        }
        ),
        catchError(this.handleError<any>("fetchAccounts",ctx))
      ).subscribe().add(cancel);

    } 
  
    @Action(SaveAccountAction)
    saveAccount(ctx : StateContext<StateModel>, { payload }: SaveAccountAction) {
      const cancel = startSpinner(ctx.patchState);
      if(payload.accountId) {
        this.httpClient.updateAccount(ctx.getState().token,payload)
        .pipe(
          tap(data => {
            console.log('Update account response : ', data);
            ctx.dispatch(new FetchAccountsAction())
            ctx.dispatch(new ShowSuccessMessage('Account saved'))
          }),
          catchError(this.handleError<any>("saveAccount",ctx))
        )
        .subscribe().add(cancel);
      } else {
        this.httpClient.addAccount(ctx.getState().token,payload)
        .pipe(
          tap(data => {
            console.log('Add account response : ', data);
            ctx.dispatch(new FetchAccountsAction());
            ctx.dispatch(new ShowSuccessMessage('Account saved'))
          }),
          catchError(this.handleError<any>("saveAccount",ctx))
        )
        .subscribe().add(cancel);
      }
    }

    @Action(DeleteAccountAction)
    deleteAccount(ctx : StateContext<StateModel>, { payload }: DeleteAccountAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.deleteAccount(ctx.getState().token,payload)
      .pipe(
        tap(data => {
          console.log('Delete account return value: ', data)
          ctx.dispatch(new FetchAccountsAction());
          ctx.dispatch(new ShowSuccessMessage('Account deleted'))
        }),
        catchError(this.handleError<any>("deleteAccount",ctx))
      )
      .subscribe().add(cancel);

    }
    
    @Action(QueryOrdersAction)
    queryOrders(ctx: StateContext<StateModel>, { payload }: QueryOrdersAction) {
      const cancel = startSpinner(ctx.patchState);
      ctx.patchState({ orderQuery : payload });
      this.httpClient.queryOrders(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          console.log('Got orders : ', data)
          if(isArray(data)) {
            const sum = data.reduce((sum, current) => sum + current.orderProfitLoss,0);
            const pipSum = data.reduce((sum, current) => sum + current.orderProfitLossPips, 0);
            ctx.patchState({ordersSum: sum, ordersPipSum: pipSum});
          }
          ctx.patchState({orders: data})
        }),
        catchError(this.handleError<any>("queryOrders",ctx))
      )
      .subscribe().add(cancel);
    }

    @Action(FetchStatsAction)
    fetchStats(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.fetchStats(ctx.getState().token)
      .pipe(
        tap(data => {
          ctx.patchState({stats: data})
        }),
        catchError(this.handleError<any>("fetchStats",ctx))
      ).subscribe().add(cancel);
    }

    @Action(FetchStrategyNamesAction)
    fetchStrategyNames(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.fetchStrategyNames(ctx.getState().token)
      .pipe(
        tap(data => {
          ctx.patchState({strategyNames : data})
        }),
        catchError(this.handleError<any>("fetchStrategyNames",ctx))
      ).subscribe().add(cancel);

    }

    @Action(FetchAccountAlertsAction)
    fetchAccountAlerts(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.fetchAccountAlerts(ctx.getState().token)
      .pipe(
        tap(
          data => {
            ctx.patchState({accountAlerts: data})
          }
        ),
        catchError(this.handleError<any>("fetchAccountAlerts",ctx))
      ).subscribe().add(cancel);
    }

    @Action(SaveAccountAlertAction)
    saveAccountAlert(ctx: StateContext<StateModel>, {payload}: SaveAccountAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.saveAccountAlert(ctx.getState().token,payload)
      .pipe(
        tap(data => {
          ctx.dispatch(new ShowSuccessMessage('Alert saved'))
          ctx.dispatch(new FetchAccountAlertsAction())
        }
          
        ),
        catchError(this.handleError<any>("saveAccountAlert",ctx))
      ).subscribe().add(cancel)
      
    }

    @Action(UpdateOrderCommentAction)
    saveOrderComment(ctx: StateContext<StateModel>, {payload}: UpdateOrderCommentAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.saveOrderComment(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          ctx.dispatch(new ShowSuccessMessage('Order comment saved'))
          
        })
      ).subscribe().add(cancel)
    }

    @Action(DeleteAccountAlertAction)
    deleteAccountAlert(ctx: StateContext<StateModel>, {payload}: DeleteAccountAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.deleteAccountAlert(ctx.getState().token,payload)
      .pipe(
        tap(data => {
          ctx.dispatch(new FetchAccountAlertsAction())
          ctx.dispatch(new ShowSuccessMessage('Alert deleted'))
        }),
        catchError(this.handleError<any>("deleteAccountAlert",ctx))
      ).subscribe().add(cancel)
      
    }

    @Action(DeleteOrderAction)
    deleteOrder(ctx: StateContext<StateModel>, {payload}: DeleteOrderAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.deleteOrder(ctx.getState().token, payload)
      .pipe(
        tap(data => {
            if(ctx.getState().orderQuery != null) {
              ctx.dispatch(new QueryOrdersAction(ctx.getState().orderQuery));
            }
            ctx.dispatch(new ShowSuccessMessage("Order deleted"));  
        })
      ).subscribe().add(cancel);

    }

    @Action(SaveNoteAction)
    saveNote(ctx: StateContext<StateModel>, {payload}:  SaveNoteAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.saveNote(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          ctx.dispatch(new ListDailyNotesAction());
          if(ctx.getState().noteQuery) {
            ctx.dispatch(new QueryNotesAction(ctx.getState().noteQuery));
          }
          
          ctx.dispatch(new ShowSuccessMessage('Note saved'));
        }),
        catchError(this.handleError<any>("saveNote",ctx))
      ).subscribe().add(cancel);
    }

    @Action(ListDailyNotesAction)
    listDailyNotes(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.listDailyNotes(ctx.getState().token)
      .pipe(
        tap(data => ctx.patchState({dailyNotes : data})),
        catchError(this.handleError<any>("listDailyNotes",ctx))
      ).subscribe().add(cancel)
    }

    @Action(QueryNotesAction)
    queryNotes(ctx: StateContext<StateModel>, {payload}: QueryNotesAction) {
      const cancel = startSpinner(ctx.patchState);
      ctx.patchState({noteQuery : payload});
      this.httpClient.queryNotes(ctx.getState().token, payload)
      .pipe(
        tap(data => ctx.patchState({notes: data})),
        catchError(this.handleError<any>("queryNotes",ctx))
      ).subscribe().add(cancel)
    }

    @Action(FindLogEventsAction)
    queryEventLogs(ctx: StateContext<StateModel>, {payload}: FindLogEventsAction) {

      const cancel = startSpinner(ctx.patchState);
      this.httpClient.findLogEvents(ctx.getState().token, payload)
      .pipe(
        tap(data => ctx.patchState({eventLogs: data})),
        catchError(this.handleError<any>("queryEventLogs",ctx))
      ).subscribe().add(cancel)
    }

    @Action(QueryDailyScannerNotificationsAction)
    queryDailyScannerNotifications(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.queryDailyScannerNotifications(ctx.getState().token)
      .pipe(
        tap(data => ctx.patchState({scannerDailyNotifications: data})),
        catchError(this.handleError<any>("queryDailyScannerNotifications",ctx))
      ).subscribe().add(cancel);
    }

    @Action(ChangePasswordAction)
    changePassword(ctx: StateContext<StateModel>, {payload}:  ChangePasswordAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.changePassword(ctx.getState().token, payload)
      .pipe(
        tap(data => ctx.dispatch(new ShowSuccessMessage("Password changed")))
      ).subscribe().add(cancel)
    }

    @Action(DeleteNoteAction)
    deleteNote(ctx: StateContext<StateModel>, {payload}:  DeleteNoteAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.deleteNote(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          ctx.dispatch(new ShowSuccessMessage('Note deleted'));
          ctx.dispatch(new ListDailyNotesAction());
          if(ctx.getState().noteQuery) {
            ctx.dispatch(new QueryNotesAction(ctx.getState().noteQuery));
          }
          
        }),
        catchError(this.handleError<any>("deleteNote",ctx))
      ).subscribe().add(cancel);
    }
    
   @Action(ShowFailureMessage)
   showFailureMessage(ctx : StateContext<StateModel>, {payload}: ShowFailureMessage) {
      console.log('Showing failure message : ', payload)
      ctx.patchState({
        showFailureMessage: true,
        // @ts-ignore
        message: payload
      });

      setTimeout(() => {
        ctx.patchState({
          showFailureMessage: false,
          message: null
        });
      }, 4000);

   }

   @Action(ListAccountSettingsAction)
   fetchSettings(ctx : StateContext<StateModel>, {payload}: ListAccountSettingsAction) {
     const cancel = startSpinner(ctx.patchState);
     this.httpClient.listAccountSettings(ctx.getState().token, payload)
     .pipe(
       tap(data => {
           ctx.patchState({settings: data, selectedAccount: payload})
       }
       ),
       catchError(this.handleError<any>("fetchSettings",ctx))
     ).subscribe().add(cancel);

   } 

   @Action(ListAccountSettingGroups)
   fetchSettingGroups(ctx : StateContext<StateModel>, {payload}: ListAccountSettingGroups) {
     const cancel = startSpinner(ctx.patchState);
     this.httpClient.listSettingGroups(ctx.getState().token, payload)
     .pipe(
       tap(data => {
           ctx.patchState({settingGroups: data, selectedAccount: payload})
       }
       ),
       catchError(this.handleError<any>("fetchSettingGroups",ctx))
     ).subscribe().add(cancel);

   } 

   @Action(SaveSettingAction)
   saveSetting(ctx: StateContext<StateModel>, {payload}:  SaveSettingAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.saveSetting(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          if(ctx.getState().selectedAccount) {
            
          }
          
          ctx.dispatch(new ShowSuccessMessage('Setting saved'));
        }),
        catchError(this.handleError<any>("saveSetting",ctx))
      ).subscribe().add(cancel);
    }

    @Action(DeleteSettingAction)
    deleteSetting(ctx: StateContext<StateModel>, {payload}:  DeleteSettingAction) {

      const cancel = startSpinner(ctx.patchState);
      this.httpClient.deleteSetting(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          if(ctx.getState().selectedAccount) {
            ctx.dispatch(new ListAccountSettingsAction(ctx.getState().selectedAccount));
          }

          ctx.dispatch(new ShowSuccessMessage("Setting deleted"));
        })
      ).subscribe().add(cancel);

    }

    @Action(ListLogEventTypesAction)
    fetchLogEventTypes(ctx: StateContext<StateModel>) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.listEventTypes(ctx.getState().token)
      .pipe(
        tap(data => {
          ctx.patchState({eventLogTypes: data})
        }),
        catchError(this.handleError<any>("fetchLogEventTypes",ctx))
      ).subscribe().add(cancel);
    }

    @Action(SaveSubscriptionInfoAction)
   saveSubscription(ctx: StateContext<StateModel>, {payload}:  SaveSubscriptionInfoAction) {
      const cancel = startSpinner(ctx.patchState);
      this.httpClient.saveSubscription(ctx.getState().token, payload)
      .pipe(
        tap(data => {
          if(ctx.getState().selectedAccount) {
            
          }
          
          ctx.dispatch(new ShowSuccessMessage('Subscription saved'));
        }),
        catchError(this.handleError<any>("saveSubscription",ctx))
      ).subscribe().add(cancel);
    }


    @Action(ShowSuccessMessage)
    showSuccessMessage(ctx : StateContext<StateModel>, {payload}: ShowSuccessMessage) {
 
       ctx.patchState({
         showSuccessMessage: true,
         message: payload
       });
 
       setTimeout(() => {
         ctx.patchState({
           showSuccessMessage: false,
           message: null
         });
       }, 5000);
 
    }

      /**
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", ctx: StateContext<StateModel> , result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      ctx.patchState({loading: false});
      ctx.dispatch(new ShowFailureMessage(error));
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}