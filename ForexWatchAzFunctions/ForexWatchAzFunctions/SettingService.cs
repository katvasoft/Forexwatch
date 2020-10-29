using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;
using KatvaSoft.ForexWatchAzFunctions;

namespace KatvaSoft.SettingService
{
    public class SettingService
    {
        string connectionstring = null;

        public List<SettingDto> findSettingsWithGroupName(string groupName)
        {
            using (var connection = new SqlConnection(GetConnectionString()))
            {
                var dtos = new List<SettingDto>();
               
                var sql = "select * from setting s where s.setting_group_name = @GroupName";
                var rows = connection.Query(sql, new { GroupName = groupName });
                foreach (IDictionary<string, object> row in rows)
                {
                    var setting = new SettingDto();
                    setting.SettingId = row["id"].ToString();
                    setting.SettingName = row["setting_name"].ToString();
                    setting.SettingValue = row["setting_value"].ToString();
                    setting.SettingAccountId = row["setting_account_id"].ToString();
                    setting.SettingGroupName = row["setting_group_name"].ToString();
                    dtos.Add(setting);
                }
                return dtos;
            }
        }


    private string GetConnectionString()
    {
        if (this.connectionstring == null)
        {
            return Environment.GetEnvironmentVariable("DbConn");

        }
        else
        {
            return this.connectionstring;
        }

    }

        public void SetConnectionString(string connStr)
        {
            this.connectionstring = connStr;
        }


}

}
