

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class OrderDTO
    {
        public string OrderId { get; set; }

        public string AccountId { get; set; }

        public string OrderLabel { get; set; }

        public double InitialOrderAmount { get; set; }

        public string ApiKey { get; set; }

        public string OrderInstrument { get; set; }

        public string OrderBalance { get; set; }

        public string OrderType { get; set; }

        public string StopLoss { get; set; }

        public string TakeProfit { get; set; }

        public string OrderAskPrice { get; set; }

        public string OrderBidPrice { get; set; }

        public string OrderLots { get; set; }

        public long OrderDate { get; set; }

        public string StrategyName { get; set; }

        public string OrderProfitLoss { get; set; }

        public string OrderProfitLossPips { get; set; }

        public string OrderComment { get; set; }

        public bool OrderOpen { get; set; }

    }

    public class AccountInfoDTO
    {
        public string AccountId { get; set; }

        public string AccountName { get; set; }

        public string ApiKey { get; set; }

        public double AccountBalance { get; set; }

        public double AccountEquity { get; set; }

        public double AccountFreeMargin { get; set; }
    }

    public class AccountAlertDTO
    {
        public string AccountId { get; set; }

        public double MinBalance { get; set; }

        public int StrategyDaysToCheck { get; set; }

        public string StrategyId { get; set; }
    }

    public class WebPushNotificationDTO
    {
        public string Id { get; set; }

        public string Key256Dh { get; set; }

        public string KeyAuth { get; set; }

        public string NotificationEndpoint { get; set; }

        public string UserId { get; set; }

    }

    public class MessageDTO
    {
        public string Subject { get; set; }

        public string Receiver { get; set; }

        public string Body { get; set; }
    }

    public class ScannerNotificationDTO
    {
        public string ScannerName { get; set; }

        public string Instrument { get; set; }

        public string NotificationMessage { get; set; }

        public string ApiKey { get; set; }
    }

    public class StrategyEventLogDTO
    {
        public string ApiKey { get; set; }

        public string LogMessage { get; set; }

        public string StrategyName { get; set; }

        public string LogMessageType { get; set; }

        public string OrderId { get; set; }

    }

    public class SettingDto
    {

        public string SettingId { get; set; }

        public string SettingName { get; set; }

        public string SettingValue { get; set; }

        public string SettingGroupName { get; set; }

        public string SettingAccountId { get; set; }
    }
}