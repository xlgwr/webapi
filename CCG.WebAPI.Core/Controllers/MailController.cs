using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Net.Mail;

using CCG.WebAPI.Core.Models;
using System.Text;
using System.Configuration;
using System.Threading.Tasks;

namespace CCG.WebAPI.Core.Controllers
{
    [Authorize]
    [RoutePrefix("api/Mail")]
    public class MailController : ApiController
    {
        public static string _smtpClientHost = ConfigurationManager.AppSettings["smtpClientHost"];
        public static int _portNumber = int.Parse(ConfigurationManager.AppSettings["portNumber"]);
        public static string _mailname = ConfigurationManager.AppSettings["mailname"];
        public static string _mailpasswd = ConfigurationManager.AppSettings["mailpasswd"];
        public static string _Subject = ConfigurationManager.AppSettings["Subject"];
        public static string _toAddressCC = ConfigurationManager.AppSettings["toAddressCC"];
        public static string _afromAddress = ConfigurationManager.AppSettings["fromAddress"];
        public static string _displayName = ConfigurationManager.AppSettings["displayName"];

        // POST api/Mail/SendEMail
        [AllowAnonymous]
        [Route("SendEMail")]
        public async Task<IHttpActionResult> SendEMail(mailBindingModels model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sendflag = await SendEmailHelpers(model);
            return Ok();
        }
        #region Helpers
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="mailTo">要发送的邮箱</param>
        ///  <param name="mailCC">要抄送的邮箱</param>
        /// <param name="mailSubject">邮箱主题</param>
        /// <param name="mailContent">邮箱内容</param>
        /// Normal = 0,Low = 1,High = 2, MailPriority
        /// <returns>返回发送邮箱的结果</returns>
        public async Task<bool> SendEmailHelpers(mailBindingModels model)
        {
            // 设置发送方的邮件信息,例如使用
            string smtpServer = _smtpClientHost; //SMTP服务器
            int portNumber = _portNumber; //端口
            //from model
            if (!string.IsNullOrEmpty(model.smtpServer))
            {
                smtpServer = model.smtpServer;
            }
            if (model.portNumber != 25)
            {
                portNumber = model.portNumber;
            }

            // 邮件服务设置
            SmtpClient smtpClient = new SmtpClient();

            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;//指定电子邮件发送方式
            smtpClient.Host = smtpServer; //指定SMTP服务器
            smtpClient.Port = portNumber; //端口

            if (model.isAnonymous)
            {
                string mailname = _mailname; //登陆用户名
                string mailpasswd = _mailpasswd;//登陆密码
                if (!string.IsNullOrEmpty(model.mailname))
                {
                    mailname = model.mailname;
                }
                if (!string.IsNullOrEmpty(model.mailpasswd))
                {
                    mailpasswd = model.mailpasswd;
                }
                smtpClient.Credentials = new System.Net.NetworkCredential(mailname, mailpasswd);//用户名和密码
            }


            // 发送邮件设置        
            MailMessage mailMessage = new MailMessage(model.mailFrom, model.mailTo); // 发送人和收件人

            //抄送
            mailMessage.CC.Add(model.mailCC);

            mailMessage.Subject = model.mailSubject;//主题
            mailMessage.Body = model.mailContent;//内容

            mailMessage.BodyEncoding = Encoding.UTF8;//正文编码
            mailMessage.IsBodyHtml = true;//设置为HTML格式

            if (model.mailpriority > 2 || model.mailpriority < 0)
            {
                model.mailpriority = 1;
            }
            mailMessage.Priority = (MailPriority)model.mailpriority;// MailPriority.Low;//优先级

            try
            {
                await smtpClient.SendMailAsync(mailMessage); // 发送邮件
                return true;
            }
            catch (SmtpException ex)
            {
                return false;
            }
        }
        #endregion
    }
}

