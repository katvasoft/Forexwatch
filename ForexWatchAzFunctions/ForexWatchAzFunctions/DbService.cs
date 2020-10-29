using Dapper;
using System.Data.SqlClient;
using System;
using System.Linq;
using System.Collections.Generic;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class DbService
    {

        string connectionString = null;
        public void ListAccounts()
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select * from account_info ai";

                var rows = connection.Query(sql).ToList();

                foreach (IDictionary<string, object> row in rows)
                {
                    var accountId = row["account_name"];
                    System.Console.WriteLine(row["id"]);
                }
            }
        }

        public List<WebPushNotificationDTO> TryGetUserWebPushNotifications(string userId)
        {
            try
            {
                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var sql = "select id Id, key256dh Key256Dh, key_auth KeyAuth, not_endpoint NotificationEndpoint, user_id UserId from account_notification an where user_id = @UserId";

                    connection.Open();

                    using (var multi = connection.QueryMultiple(sql, new { UserId = userId }))
                    {
                        return multi.Read<WebPushNotificationDTO>().ToList();
                    }
                }
            } catch (Exception exp)
            {
                return new List<WebPushNotificationDTO>();
            }
        }

        public AccountInfoDTO FindAccountInfoWithId(string accountId)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select id AccountId, account_name AccountName, account_api_key ApiKey, account_balance AccountBalance, account_equity AccountEquity, account_free_margin AccountFreeMargin from account_info ai where id = @AccountId";

                return connection.QueryFirst<AccountInfoDTO>(sql, new { AccountId = accountId });
            }
        }

        public List<AccountAlertDTO> FindAccountAlertWithAccountId(string accountId)
        {
            using(var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select min_balance MinBalance, strategy_days_to_check StrategyDaysToCheck, strategy_id StrategyId from account_alert aa where account_id = @AccountId";

                connection.Open();

                using (var multi = connection.QueryMultiple(sql, new { AccountId = accountId }))
                {
                    return multi.Read<AccountAlertDTO>().ToList();
                }
            }
        }

        public double GetStrategySumWithDays(string strategyName, int days)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var result = connection.ExecuteScalar<double>(GetStrategyAlertQuery(strategyName, days));

                return result;
            }
        }

        public String GetUserIdWithAccountId(String accountId)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select user_id from account_info ai where ai.id = @AccountId";

                var result = connection.ExecuteScalar<string>(sql, new { AccountId = accountId });


                return result;
            }
        }

        public String GetUserIdWithAccountApiKey(String apikey)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select user_id from account_info ai where ai.account_api_key = @ApiKey";

                var result = connection.ExecuteScalar<string>(sql, new { ApiKey = apikey });


                return result;
            }
        }


        public String GetAccountIdWithApiKey(String apikey)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var sql = "select id FROM account_info ai WHERE ai.account_api_key = @apiKey";

                var result = connection.ExecuteScalar<string>(sql, new { apiKey = apikey });

                return result;
            }
        }

        public String CheckIfOrderExists(string OrderId)
        {
            try
            {
                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var sql = "select id from order_info oi where oi.order_id = @orderId";

                    var result = connection.ExecuteScalar<string>(sql, new { orderId = OrderId });


                    return result;
                }
            } catch(Exception exp)
            {
                return null;
            }
            
        }

        public int UpdateOrderInfo(OrderDTO orderDTO, string id)
        {
            try
            {
                var sql = "update order_info set order_profit_loss = @OrderProfitLoss, order_profit_loss_pips = @OrderProfitLossPips, order_open = @OrderOpen, order_close_date = @OrderCloseDate, order_comment = @OrderComment where id = @Id";
                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var affectedRows = connection.Execute(sql, new
                    {
                        OrderProfitLoss = orderDTO.OrderProfitLoss,
                        OrderProfitLossPips = orderDTO.OrderProfitLossPips,
                        OrderOpen = orderDTO.OrderOpen,
                        OrderCloseDate = DateTime.Now,
                        OrderComment = orderDTO.OrderComment,
                        Id = id
                    });
                    return affectedRows;
                }

            } catch (Exception exp)
            {
                return 0;
            }
        }

        public int UpdateAccountInfo(AccountInfoDTO accountInfoDTO)
        {
            try
            {
                var sql = "update account_info set account_balance = @AccountBalance, account_equity = @AccountEquity, account_free_margin = @AccountFreeMargin where id = @Id";

                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var affectedRows = connection.Execute(sql, new
                    {
                        AccountBalance = accountInfoDTO.AccountBalance,
                        AccountEquity = accountInfoDTO.AccountEquity,
                        AccountFreeMargin = accountInfoDTO.AccountFreeMargin,
                        Id = accountInfoDTO.AccountId
                    });
                    return affectedRows;
                }
            } catch (Exception e)
            {
                return 0;
            }
        } 

        public string StoreScannerNotification(ScannerNotificationDTO notificationDTO)
        {
            try
            {
                var accountId = GetAccountIdWithApiKey(notificationDTO.ApiKey);
                var scannerNotificationId = Guid.NewGuid().ToString();

                string sql = "INSERT INTO scanner_notification VALUES (@id,@accId,@instrument,@notificationDate, @notificationMessage, @scannerName)";

                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var affectedRows = connection.Execute(sql,
                        new
                        {
                            id = scannerNotificationId,
                            accId = accountId,
                            instrument = notificationDTO.Instrument,
                            notificationDate = DateTime.Now,
                            notificationMessage = notificationDTO.NotificationMessage,
                            scannerName = notificationDTO.ScannerName
                        });
                }

                return scannerNotificationId;
            }
            catch(Exception exp)
            {
                return null;
            }
        }

        public string StoreStrategyLogEvent(StrategyEventLogDTO strategyEventLogDTO)
        {
            try
            {
                var accountId = GetAccountIdWithApiKey(strategyEventLogDTO.ApiKey);
                var guid = Guid.NewGuid().ToString();

                string sql = "INSERT INTO strategy_log_event (id,account_id,log_event_date,log_message,log_message_type,order_id,strategy_name) " +
                "VALUES (@id, @accId,@eventDate,@message,@messageType,@orderId,@strategyName)";
                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var affectedRows = connection.Execute(sql, new
                    {
                        id = guid,
                        accId = accountId,
                        eventDate = DateTime.Now,
                        message = strategyEventLogDTO.LogMessage,
                        strategyName = strategyEventLogDTO.StrategyName,
                        messageType = strategyEventLogDTO.LogMessageType,
                        orderId = strategyEventLogDTO.OrderId
                    });
                }

                return guid;
            }
            catch (Exception exp)
            {
                return null;
            }
        }

        public string StoreOrderInfo(OrderDTO orderDTO)
        {
           try
            {
                var accountId = GetAccountIdWithApiKey(orderDTO.ApiKey);

                var newOrderId = Guid.NewGuid().ToString();

                string sql = "INSERT INTO order_info (id, account_id, lots, order_ask_price, order_bid_price, order_comment, order_date, order_id, order_instrument, order_open, order_stop_loss, order_take_profit, order_type, strategy_name) " +
                             "VALUES(@id, @account_id, @lot, @order_ask_price, @order_bid_price, @order_comment, @order_date, @order_id, @order_instrument,@order_open, @order_stop_loss, @order_take_profit, @order_type, @strategy_name )";

                using (var connection = new SqlConnection(GetConnectionString()))
                {
                    var affectedRows = connection.Execute(sql,
                        new
                        {
                            id = newOrderId,
                            account_id = accountId,
                            lot = orderDTO.OrderLots,
                            order_ask_price = orderDTO.OrderAskPrice,
                            order_bid_price = orderDTO.OrderBidPrice,
                            order_comment = orderDTO.OrderComment,
                            order_date = DateTime.Now,
                            order_id = orderDTO.OrderId,
                            order_instrument = orderDTO.OrderInstrument,
                            order_open = true,
                            order_stop_loss = orderDTO.StopLoss,
                            order_take_profit = orderDTO.TakeProfit,
                            order_type = orderDTO.OrderType,
                            strategy_name = orderDTO.StrategyName
                        }); ;
                }

                return newOrderId;

            } catch(Exception exp)
            {
                return null;
            }

        }

        private string GetStrategyAlertQuery(string strategyName, int daysFrom)
        {
            int daysFromMinus = daysFrom * -1;
            return $"SELECT SUM(order_profit_loss_pips) from order_info where strategy_name = '{strategyName}' and order_date between DATEADD(day,{daysFromMinus},GETDATE()) and GETDATE()";
        }

        //This is for testing purposes
        public void SetConnectionString(string connStr)
        {
            this.connectionString = connStr;
        }

        private string GetConnectionString()
        {
            if(this.connectionString == null)
            {
               return Environment.GetEnvironmentVariable("DbConn");
                
            } else
            {
                return this.connectionString;
            }
            
        }

        
    }
}