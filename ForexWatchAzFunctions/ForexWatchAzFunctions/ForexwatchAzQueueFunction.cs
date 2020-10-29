using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

/*
 * TODO: Refactor web push notifications to be part of notification service and call that for all notifications !!
 */ 

namespace KatvaSoft.ForexWatchAzFunctions
{
    public static class ForexwatchAzQueueFunction
    {
        [FunctionName("ForexwatchAzQueueFunction")]
        public static void Run([QueueTrigger("orders", Connection = "connstr")]string orderMessage, ILogger log)
        {
            try
            {
                log.LogInformation("Received order message from queue : " + orderMessage);
                var dbConnStr = Environment.GetEnvironmentVariable("DbConn");

                var orderService = new OrderService();
                orderService.SetConnectionsString(dbConnStr);

                orderService.StoreOrderInfo(orderMessage, log);
                log.LogInformation("Order information processed.");
            } catch (Exception exp)
            {
                log.LogError("Exception occurred when processing order : " + exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }
           
        }
    }

    public static class ForexwatchAccountAzFunction
    {
        [FunctionName("ForexwatchAccountAzFunction")]
        public static void Run([QueueTrigger("accountinfos", Connection = "connstr")]string accountMessage, ILogger log)
        {
            try
            {
                log.LogInformation("Received account info message from queue: " + accountMessage);
                var dbConnStr = Environment.GetEnvironmentVariable("DbConn");

                var accountService = new AccountService();
                accountService.SetConnectionsString(dbConnStr);

                accountService.UpdateAccountInfo(accountMessage, log);
                log.LogInformation("Account message processed");

            } catch (Exception exp)
            {
                log.LogError("Exception occurred when processing account message : " + exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }

        }
    }

    public static class ForexwatchMessageAzFunction
    {
        [FunctionName("ForexwatchMessageAzFunction")]
        public static void Run([QueueTrigger("messages", Connection = "connstr")]string message, ILogger log)
        {
            try
            {
                log.LogInformation("Received notification message : " + message);
                var notificationService = new NotificationService();
                notificationService.SendMessage(Mappers.MapStrToMessageDTO(message));
                log.LogInformation("Notification message processed");
            } catch(Exception exp)
            {
                log.LogError("Exception occurred when processing notification message : " + exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }
  
        }
    }

    public static class ForexwatchStrategyEventLogAzFunction
    {
        private static WebPushService webPushNotifier = new WebPushService();
        [FunctionName("ForexwatchStrategyEventLogAzFunction")]
        public static void Run([QueueTrigger("eventlogs", Connection = "connstr")]string message, ILogger log)
        {
            try
            {
                log.LogInformation("Received event log from queue : " + message);
                var dbConnStr = Environment.GetEnvironmentVariable("DbConn");

                var eventLog = Mappers.MapStrToStrategyEventLog(message);

                DbService dbService = new DbService();
                dbService.SetConnectionString(dbConnStr);
                dbService.StoreStrategyLogEvent(eventLog);
                //TODO: Refactor this to be part of notification service
                webPushNotifier.SetConnectionString(dbConnStr);
                webPushNotifier.WebPush(eventLog);
                log.LogInformation("Event log message processed");
            } catch(Exception exp)
            {
                log.LogError("Exception occurred when processing log event message : " + exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }

           

        }
    }

    public static class ForexwatchScannerNotificationAzFunction
    {
        [FunctionName("ForexwatchScannerNotificationAzFunction")]
        public static void Run([QueueTrigger("scannernotifications", Connection = "connstr")]string message, ILogger log)
        {
            try
            {
                log.LogInformation("Received scanner notification from queue: " + message);
                //TODO: Add twilio message sending and later on web PUSH-notifications
                var notificationService = new NotificationService();
                var scannerNotification = Mappers.MapStrToScannerNotificationDTO(message);

                var dbConnStr = Environment.GetEnvironmentVariable("DbConn");
                DbService dbService = new DbService();
                dbService.SetConnectionString(dbConnStr);
                dbService.StoreScannerNotification(scannerNotification);
                notificationService.SendScannerNotification(scannerNotification);
                log.LogInformation("Scanner notification processed");
            } catch(Exception exp)
            {
                log.LogError("Exception occurred when processing scanner notification : " + exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }
        
        }
    }

    public static class ForexwatchPollerAzFunction
    {
        [FunctionName("ForexwatchPollerAzFunction")]
        public static void Run([TimerTrigger("0 */20 * * * * ")] TimerInfo myTimer, ILogger log)
        {
            try
            {
                var dbConnStr = Environment.GetEnvironmentVariable("DbConn");
                var accountApiKeys = Environment.GetEnvironmentVariable("PollApiKeys");
                var alertService = new AlertService(dbConnStr);
                if (accountApiKeys != null)
                {
                    var apiKeys = accountApiKeys.Split(",");
                    foreach(var key in apiKeys)
                    {
                        alertService.CheckAccountAlerts(key, log);
                    }
                }
            } catch(Exception exp)
            {
                log.LogError("Exception occurred in ForexwatchPollerAzFunction : " +exp.Message);
                log.LogError("Stack trace : " + exp.StackTrace);
            }
           
        }
        
    }
}
