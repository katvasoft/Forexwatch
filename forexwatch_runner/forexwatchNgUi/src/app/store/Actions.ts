
export class LoginAction {

    static readonly type = '[USER] login'

    constructor(public payload: any) {}

}

export class LogOutAction {

  static readonly type = '[USER] logout'

}

export class ShowFailureMessage {

    static readonly type = '[MESSAGE] failure';
  
    constructor(public payload: string) {}
  }
  
  export class ShowSuccessMessage {
  
    static readonly type = '[MESSAGE] success';
  
    constructor(public payload: string) {}
  }
  
  export class FetchStatsAction {

    static readonly type = '[STATS] fetch';

  }

  export class FetchAccountsAction {

    static readonly type = '[ACCOUNTS] fetch'

  }

  export class SaveAccountAction {

    static readonly type = '[ACCOUNT] save'

    constructor(public payload: any) {}

  }

  export class DeleteAccountAction {

    static readonly type = '[ACCOUNT] delete'

    constructor(public payload: string) {}

  }

  export class QueryOrdersAction {

    static readonly type = '[ORDERS] query'

    constructor(public payload: any) {}

  }

  export class FetchStrategyNamesAction {

    static readonly type = '[STRATEGY_NAMES] fetch'

  }

  export class FetchAccountAlertsAction {

    static readonly type = '[ACCOUNT_ALERTS] fetch'

  }

  export class SaveAccountAlertAction {

    static readonly type = '[ACCOUNT_ALERT] save'

    constructor(public payload: any) {}

  }

  export class DeleteAccountAlertAction {

    static readonly type = '[ACCOUNT_ALERT] delete'

    constructor(public payload: string) {}

  }

  export class UpdateOrderCommentAction {

    static readonly type = '[ORDER] comment update'

    constructor(public payload: any) {}

  }

  export class DeleteOrderAction {
    
    static readonly type = '[ORDER] delete'

    constructor(public payload: string) {}

  }

  export class SaveNoteAction {

    static readonly type = '[NOTE] save'

    constructor (public payload: any) {}

  }

  export class DeleteNoteAction {

    static readonly type = '[NOTE] delete'

    constructor (public payload: string) {}

  }

  export class ListDailyNotesAction {

    static readonly type = '[NOTE] list daily'

  }

  export class QueryNotesAction {

    static readonly type = '[NOTE] query'

    constructor (public payload: any) {}
    
  }

  export class ChangePasswordAction {

    static readonly type = '[PASSWORD] change'

    constructor (public payload: any) {}
  }

  export class QueryDailyScannerNotificationsAction {

    static readonly type = '[SCANNER_NOTIFICATIONS] daily'

  }

  export class ListAccountSettingsAction {

    static readonly type = '[SETTING] list'

    constructor (public payload : any) {}

  }

  export class SaveSettingAction {

    static readonly type = '[SETTING] save'

    constructor (public payload : any) {}

  }

  export class DeleteSettingAction {

    static readonly type = '[SETTING] delete'

    constructor (public payload : any) {}

  }

  export class ListAccountSettingGroups {
    
    static readonly type = '[SETTING_GROUP] list'

    constructor (public payload : any) {}
    
  }
  
  export class FindLogEventsAction {

    static readonly type = '[LOG_EVENT] find';

    constructor (public payload: any) {
    }

  }

  export class ListLogEventTypesAction {

    static readonly type = '[LOG_EVENT] types'

  }

  export class SaveSubscriptionInfoAction {

    static readonly type = '[SAVE] subscription'

    constructor (public payload: any) {
    }

  }
