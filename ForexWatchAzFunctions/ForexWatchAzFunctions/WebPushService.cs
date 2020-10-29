using System;
using System.Collections.Generic;
using System.Text;
using Lib.Net.Http.WebPush;
using Lib.Net.Http.WebPush.Authentication;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class WebPushService
    {

        private static readonly PushServiceClient _pushClient = new PushServiceClient
        {
            DefaultAuthentication = new VapidAuthentication(
           "BNBSwchfO_AVBr60-xQdhpV52Qekaf52e2LctEixAzpB8hwwjrP2dTW57SgwMOOGWtr9qDdQAfu78MoEaHYxDog",
           "eNFZ8ge_EdJfWh1FVOiL5Hm8kXGM7M8uG2pqViLFeT8")
            {
                Subject = "https://forexwatchui.azurewebsites.net/forexwatch_runner/"
            }
        };

        private readonly DbService dbService = new DbService();

        public void WebPush(StrategyEventLogDTO strategyEventLogDTO)
        {
            try
            {
                var message = new PushMessage(CreateJsonStringFromLogEvent(strategyEventLogDTO));
                var userId = dbService.GetUserIdWithAccountApiKey(strategyEventLogDTO.ApiKey);
                if(userId != null)
                {
                    var subscriptions = dbService.TryGetUserWebPushNotifications(userId);
                    foreach(var sub in subscriptions)
                    {
                        var pushSub = GetPushSubscriptionForDbSubscription(sub);
                        
                        var result = _pushClient.RequestPushMessageDeliveryAsync(pushSub, message);
                        result.Wait();

                        System.Diagnostics.Debug.WriteLine("Web push notification sent :" + pushSub.Endpoint);
                    }
                    
                }

            } catch(Exception exp)
            {
                System.Diagnostics.Debug.WriteLine("Exception occurred : "+  exp.Message);
            }
          
        }

        private string CreateJsonStringFromLogEvent(StrategyEventLogDTO strategyEvent)
        {
            var jsonString = " {\"notification\": {\"title\": \"Forexwatch log event\",\"body\": \" "+strategyEvent.LogMessageType+" :"+strategyEvent.LogMessage+"\" }}";
            return jsonString;
        }

        private PushSubscription GetPushSubscriptionForDbSubscription(WebPushNotificationDTO sub)
        {
            var subscription = new PushSubscription();
            subscription.Endpoint = sub.NotificationEndpoint;
            var keyDict = new Dictionary<string, string>();
            keyDict.Add("p256dh", sub.Key256Dh);
            keyDict.Add("auth", sub.KeyAuth);
            subscription.Keys = keyDict;
            return subscription;
        }

        //For testing
        public void SetConnectionString(string connStr)
        {
            this.dbService.SetConnectionString(connStr);
        }


    }
}
