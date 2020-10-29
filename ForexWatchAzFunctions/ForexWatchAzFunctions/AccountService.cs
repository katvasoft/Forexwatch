using System;
using Microsoft.Extensions.Logging;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class AccountService
    {
        Mappers mapper = new Mappers();
        DbService dbService = new DbService();

        public void SetConnectionsString(string connstr)
        {
            this.dbService.SetConnectionString(connstr);
        }

        public AccountService()
        {
        }

        public void UpdateAccountInfo(string accountInfoStr, ILogger logger)
        {
            try
            {
                var accountInfoDto = mapper.MapJsonStringToAccountDTO(accountInfoStr);

                var accountId = dbService.GetAccountIdWithApiKey(accountInfoDto.ApiKey);

                if(accountId != null)
                {
                    accountInfoDto.AccountId = accountId;
                    dbService.UpdateAccountInfo(accountInfoDto);

                } else
                {
                    logger.LogWarning("No account info found with api key : " + accountInfoDto.ApiKey);
                }

            } catch (Exception exp)
            {
                logger.LogError("UpdateAccountInfo - Exception : " + exp.Message);
                logger.LogError(exp.StackTrace);
            }
        } 
    }
}
