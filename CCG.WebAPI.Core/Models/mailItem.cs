using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mail;

namespace CCG.WebAPI.Core.Models
{
    public class mailItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 0)]
        public long Id { get; set; }
        public string smtpServer { get; set; }
        public int portNumber { get; set; }

        public string mailname { get; set; }
        public string mailpasswd { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string mailFrom { get; set; }
        [Required]
        public string[] mailTo { get; set; }
        public string[] mailCC { get; set; }
        public string[] mailBCC { get; set; }
        [Required]
        public string mailSubject { get; set; }
        public string mailContent { get; set; }

        public int mailpriority { get; set; }
        public bool isAnonymous { get; set; }
    }
}