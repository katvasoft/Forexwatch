using System;
using Microsoft.Extensions.Logging;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class OrderService
    {
        Mappers mapper = new Mappers();
        DbService dbService = new DbService();

        public OrderService()
        {
        }

        public void SetConnectionsString(string connstr)
        {
            this.dbService.SetConnectionString(connstr);
        }

        public void StoreOrderInfo(string orderStr, ILogger logger)
        {
            try
            {
                var orderDto = mapper.MapJsonStringToOrderDTO(orderStr);

                var id = dbService.CheckIfOrderExists(orderDto.OrderId);
                
                if(id != null)
                {
                    logger.LogInformation("Existing order found with " + orderDto.OrderId);
                    dbService.UpdateOrderInfo(orderDto, id);
                }else
                {
                    logger.LogInformation(" No existing order found with " + orderDto.OrderId);
                    dbService.StoreOrderInfo(orderDto);
                }

            } catch(Exception exp)
            {
                logger.LogError("StoreOrderInfo, Exception - " + exp.Message);
                logger.LogError(exp.StackTrace);
            }
        }
    }
}
