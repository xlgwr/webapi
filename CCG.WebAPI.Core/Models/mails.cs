using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace CCG.WebAPI.Core.Models
{
    public class mails
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(128)]
        public string domain { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(128)]
        public string UserName { get; set; }

        public virtual ICollection<mailItem> mailItems { get; set; }

    }
}