using System;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class Mappers
    {
        public Mappers()
        {
        }

        public OrderDTO MapJsonStringToOrderDTO(string orderStr)
        {
            var orderDto = new OrderDTO();

            Dictionary<string, string> jsonMap = JsonConvert.DeserializeObject<Dictionary<string,string>> (orderStr);

            orderDto.OrderId = jsonMap.GetValueOrDefault("orderId");
            orderDto.AccountId = jsonMap.GetValueOrDefault("accountId");
            orderDto.OrderLabel = jsonMap.GetValueOrDefault("orderLabel");
            try
            {
                orderDto.InitialOrderAmount = Convert.ToDouble(jsonMap.GetValueOrDefault("initialOrderAmount","0"));
            } catch(Exception exp)
            {

            }
            
            orderDto.ApiKey = jsonMap.GetValueOrDefault("apiKey");
            orderDto.OrderInstrument = jsonMap.GetValueOrDefault("orderInstrument");
            orderDto.OrderBalance = jsonMap.GetValueOrDefault("orderBalance");
            orderDto.OrderType = jsonMap.GetValueOrDefault("orderType");
            orderDto.StopLoss = jsonMap.GetValueOrDefault("stopLoss");
            orderDto.TakeProfit = jsonMap.GetValueOrDefault("takeProfit");
            orderDto.OrderAskPrice = jsonMap.GetValueOrDefault("orderAskPrice");
            orderDto.OrderBidPrice = jsonMap.GetValueOrDefault("orderBidPrice");
            orderDto.OrderLots = jsonMap.GetValueOrDefault("orderLots");
            try
            {
                orderDto.OrderDate = Convert.ToInt64(jsonMap.GetValueOrDefault("orderDate","0"));
            } catch (Exception exp)
            {

            }
            
            orderDto.StrategyName = jsonMap.GetValueOrDefault("strategyName");
            orderDto.OrderProfitLoss = jsonMap.GetValueOrDefault("orderProfitLoss");
            orderDto.OrderProfitLossPips = jsonMap.GetValueOrDefault("orderProfitLossPips");
            orderDto.OrderComment = jsonMap.GetValueOrDefault("orderComment");
            orderDto.OrderOpen = Convert.ToBoolean(jsonMap.GetValueOrDefault("orderOpen"));

            return orderDto;
        }

        public AccountInfoDTO MapJsonStringToAccountDTO(string accountStr)
        {
            Dictionary<string, string> jsonMap = JsonConvert.DeserializeObject<Dictionary<string, string>>(accountStr);

            var accountDto = new AccountInfoDTO();
            accountDto.ApiKey = jsonMap.GetValueOrDefault("apiKey");
            accountDto.AccountBalance = Convert.ToDouble(jsonMap.GetValueOrDefault("accountBalance"));
            accountDto.AccountEquity = Convert.ToDouble(jsonMap.GetValueOrDefault("accountEquity"));
            accountDto.AccountFreeMargin = Convert.ToDouble(jsonMap.GetValueOrDefault("accountFreeMargin"));

            return accountDto;
        }

        public static MessageDTO MapStrToMessageDTO(string messageStr)
        {
            return JsonConvert.DeserializeObject<MessageDTO>(messageStr);
        }

        public static ScannerNotificationDTO MapStrToScannerNotificationDTO(string messageStr)
        {
            return JsonConvert.DeserializeObject<ScannerNotificationDTO>(messageStr);
        }

        public static StrategyEventLogDTO MapStrToStrategyEventLog(string messageStr)
        {
            return JsonConvert.DeserializeObject<StrategyEventLogDTO>(messageStr);
        }
    }
}
