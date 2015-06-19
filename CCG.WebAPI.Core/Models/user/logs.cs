using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace CCG.WebAPI.Core.Models.user
{
    public class logs
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
        public string UserName { get; set; }

        public string types { get; set; }
        public string pcName { get; set; }
        public string IP { get; set; }
        public string pcIE { get; set; }
        public string clienturl { get; set; }
        public string pcSystem { get; set; }

        [Index(Order=0)]
        public DateTime lognTime { get; set; }
        public DateTime reflashlognTime { get; set; }
        public string remark { get; set; }

        [ForeignKey("ApplicationUser")]
        [StringLength(128)]
        public string Userid { get; set; }

        [JsonIgnoreAttribute]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}