using System;
using Xunit;
using KatvaSoft.ForexWatchAzFunctions;
using Microsoft.Extensions.Logging;

namespace ForexWatchAzFunctionTests
{
    public class ForexwatchFunctionTests
    {

		string testConnectionString = "Server=localhost;Database=forexwatch;User Id=sa;Password=Salis123;";

		string prodConnectionString = "Server=tcp:the.host,1433;Initial Catalog=forexwatch;Persist Security Info=False;User ID=forexwatch;Password=ThePword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

		[Fact]
        public void TestOrderAdd()
        {
			var logger = new LoggerFactory().CreateLogger("test");
            var jsonString = @"{
	            ""orderId"" : ""Ord123"",
	            ""orderLabel"" : ""test string"",
	            ""initialOrderAmount"" : 100,
	            ""apiKey"" : ""123"",
	            ""orderInstrument"" : ""EURUSD"",
	            ""orderBalance"" : 100,
	            ""orderType"" : ""BUY"",
	            ""stopLoss"": 1.0700,
	            ""takeProfit"": 1.0800,
	            ""orderAskPrice"" : 1.0720,
	            ""orderBidPrice"": 1.0721,
	            ""orderLots"": 10000,
	            ""strategyName"" : ""Test strategy"",
	            ""orderProfitLoss"": 0,
	            ""orderProfitLossPips"" : 0,
	            ""orderComment"" : ""This is just a test"",
	            ""orderOpen"": true
            }";

			var orderService = new OrderService();
			orderService.SetConnectionsString(testConnectionString);
			orderService.StoreOrderInfo(jsonString,logger);
        }

		[Fact]
		public void TestAccountAlertNotificationSend()
		{
			var notificationService = new NotificationService();
			var sgApiKey = "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";
			var subject = "Test alert";
			var receiver = "tuomas.katva@gmail.com";
			var sender = "test.alert@forexwatch.com";
			notificationService.SetConfigurationDetails(sgApiKey, sender, receiver, subject);
			notificationService.SendAccountAlert(CreateTestAccountInfo(), CreateTestAlert());
		}

		[Fact]
		public void TestWebPush()
		{
			var webPushService = new WebPushService();
			webPushService.SetConnectionString(this.testConnectionString);
			webPushService.WebPush(CreateTestLogEvent());
		}

		[Fact]
		public void TestAlertServiceAccountAlert()
		{
			var logger = new LoggerFactory().CreateLogger("test");
			var alertService = new AlertService(this.prodConnectionString);
			alertService.CheckAccountAlerts("112233", logger);
		}

		private AccountInfoDTO CreateTestAccountInfo()
		{
			var accountInfo = new AccountInfoDTO();

			accountInfo.AccountBalance = 100;
			accountInfo.AccountEquity = 100;
			accountInfo.AccountFreeMargin = 100;
			accountInfo.AccountId = "123";
			accountInfo.AccountName = "Unit test account";
			accountInfo.ApiKey = "111";
			
			return accountInfo;
		}

		private StrategyEventLogDTO CreateTestLogEvent()
		{
			var logEvent = new StrategyEventLogDTO();
			logEvent.ApiKey = "123";
			logEvent.LogMessage = "This is a test";
			logEvent.LogMessageType = "INFO";
			return logEvent;
		}

		private AccountAlertDTO CreateTestAlert()
		{
			var alert = new AccountAlertDTO();

			alert.AccountId = "123";
			alert.MinBalance = 100;
			alert.StrategyDaysToCheck = 10;
			alert.StrategyId = "Test strategy";

			return alert;
		}
    }
}
