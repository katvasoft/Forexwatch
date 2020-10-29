using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class AlertService
    {
        DbService dbService = new DbService();
        NotificationService notificationService = new NotificationService();

        public AlertService(string connectionStr)
        {
            dbService.SetConnectionString(connectionStr);
        }

        public void CheckAccountAlerts(string apiKey, ILogger log)
        {
            var accountId = this.dbService.GetAccountIdWithApiKey(apiKey);
            log.LogInformation("Found : "+ accountId + " with : " + apiKey );
            var accountInfo = this.dbService.FindAccountInfoWithId(accountId);

            if(accountInfo != null)
            {
                var accountAlerts = this.dbService.FindAccountAlertWithAccountId(accountId);
                if(accountAlerts != null)
                {
                    foreach(var accountAlert in accountAlerts)
                    {
                        if(accountInfo.AccountEquity <= accountAlert.MinBalance)
                        {
                            notificationService.SendAccountAlert(accountInfo, accountAlert);
                        }
                        if(accountAlert.StrategyId != null)
                        {
                            var strategySum = dbService.GetStrategySumWithDays(accountAlert.StrategyId, accountAlert.StrategyDaysToCheck);
                            if(strategySum <= accountAlert.MinBalance)
                            {
                                notificationService.SendAccountStrategyAlert(accountInfo, accountAlert);
                            }
                        }
                    }
                }
            } else
            {
                log.LogWarning("CheckAccountAlerts - Could not find account with apikey : " + apiKey);
            }

        }



    }
}
