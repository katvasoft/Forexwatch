using System;
using System.Collections.Generic;
using System.Text;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace KatvaSoft.ForexWatchAzFunctions
{
    public class NotificationService
    {

        private string _apiKey;
        private string _sender;
        private string _receiver;
        private string _subject;

        private string _twilioAccountSid;
        private string _twilioAuthToken;
        private string _twilioSendNumber;
        private string _twilioReceiverNumber;

        public void SendAccountAlert(AccountInfoDTO accountInfoDTO, AccountAlertDTO accountAlertDTO)
        {
            var client = new SendGridClient(GetApiKey());
            var from = new EmailAddress(GetSender());
            var subject = GetAccountAlertSubject();
            var to = new EmailAddress(GetReceiver());
            var plainTextContent = GetAccountAlertBody(accountInfoDTO,accountAlertDTO);
            var htmlContent = "<strong>"+GetAccountAlertBody(accountInfoDTO,accountAlertDTO)+"</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);
            response.Wait();
            
        }

        public void SendAccountStrategyAlert(AccountInfoDTO accountInfoDTO, AccountAlertDTO accountAlertDTO)
        {
            var client = new SendGridClient(GetApiKey());
            var from = new EmailAddress(GetSender());
            var subject = GetAccountAlertSubject();
            var to = new EmailAddress(GetReceiver());
            var plainTextContent = GetAccountStrategyAlertBody(accountInfoDTO, accountAlertDTO);
            var htmlContent = "<strong>" + GetAccountStrategyAlertBody(accountInfoDTO, accountAlertDTO) + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);
            response.Wait();
        }

        public void SendScannerNotification(ScannerNotificationDTO scannerNotificationDTO)
        {
            var client = new SendGridClient(GetApiKey());
            var from = new EmailAddress(GetSender());
            var subject = GetScannerNotificationSubject(scannerNotificationDTO);
            var to = new EmailAddress(GetReceiver());
            var plainTextContent = GetScannerNotificationBody(scannerNotificationDTO);
            var htmlContent = "<strong>" + GetScannerNotificationBody(scannerNotificationDTO) + "</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = client.SendEmailAsync(msg);
            response.Wait();
        }

        public void SendMessage(MessageDTO messageDTO)
        {
            var client = new SendGridClient(GetApiKey());
            var htmlContent = "<p>" + messageDTO.Body + "</p>";
            var msg = MailHelper.CreateSingleEmail(new EmailAddress(GetSender()), new EmailAddress(messageDTO.Receiver), messageDTO.Subject, messageDTO.Body, htmlContent);
            var response = client.SendEmailAsync(msg);
            response.Wait();
        }

        public void SetConfigurationDetails(string apiKey, string sender, string receiver, String subject)
        {
            this._apiKey = apiKey;
            this._receiver = receiver;
            this._sender = sender;
            this._subject = subject;
        }

        private String GetApiKey()
        {
            if(this._apiKey != null)
            {
                return this._apiKey;
            }
            return Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        }

        private String GetReceiver()
        {
            if(this._receiver != null)
            {
                return this._receiver;
            }
            return Environment.GetEnvironmentVariable("SENDGRID_RECEIVER");
        }

        private String GetSender()
        {
            if(this._sender != null)
            {
                return this._sender;
            }
            return Environment.GetEnvironmentVariable("SENDGRID_SENDER");
        }

        private String GetAccountAlertSubject()
        {
            if(this._subject != null)
            {
                return this._subject;
            }
            return Environment.GetEnvironmentVariable("ACCOUNT_ALERT_SUBJECT");
        }

        private String GetTwilioAccountSid()
        {
            if(this._twilioAccountSid != null)
            {
                return this._twilioAccountSid;
            }
            return Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");

        }

        private String GetTwilioAuthToken()
        {
            if(this._twilioAuthToken != null)
            {
                return this._twilioAuthToken;
            }

            return Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
        }

        private String GetTwilioSendNumber()
        {
            if(this._twilioSendNumber != null)
            {
                return this._twilioSendNumber;
            }
            return Environment.GetEnvironmentVariable("TWILIO_SEND_NUMBER");
        }

        private String GetTwilioSmsReceiverNumber()
        {
            if(this._twilioReceiverNumber != null)
            {
                return this._twilioReceiverNumber;
            }

            return Environment.GetEnvironmentVariable("TWILIO_RECEIVER_NUMBER");
        }

        private string GetScannerNotificationSubject(ScannerNotificationDTO notificationDTO)
        {
            return "Scanner notification : " + notificationDTO.ScannerName + " " + notificationDTO.Instrument;
        } 

        private string GetScannerNotificationBody(ScannerNotificationDTO notificationDTO)
        {
            return notificationDTO.ScannerName + " " + notificationDTO.Instrument + "\n" + notificationDTO.NotificationMessage;
        }

        private string GetAccountAlertBody(AccountInfoDTO accountInfoDTO, AccountAlertDTO accountAlertDTO)
        {
            var body = $"Account : {accountInfoDTO.AccountName} alert triggered! \n";
            body = body + $"account equity is {accountInfoDTO.AccountEquity} and the alert limit was {accountAlertDTO.MinBalance}";

            return body;
        }

        private string GetAccountStrategyAlertBody(AccountInfoDTO accountInfoDTO, AccountAlertDTO accountAlertDTO)
        {
            var body = $"Account : {accountInfoDTO.AccountName} alert triggered! \n";
            body = body + $". Strategy {accountAlertDTO.StrategyId} min balance was : {accountAlertDTO.MinBalance} exceeded for {accountAlertDTO.StrategyDaysToCheck} days";

            return body;
        }
    }
}
