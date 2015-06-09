using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mail;

namespace CCG.WebAPI.Core.Models
{
    public class mailBindingModels
    {
        public string smtpServer { get; set; }
        public int portNumber { get; set; }

        public string mailname { get; set; }
        public string mailpasswd { get; set; }

        public string mailFrom { get; set; }
        public string mailTo { get; set; }
        public string mailCC { get; set; }

        public string mailSubject { get; set; }
        public string mailContent { get; set; }

        public int mailpriority { get; set; }
        public bool isAnonymous { get; set; }
    }
}