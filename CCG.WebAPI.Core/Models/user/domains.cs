using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CCG.WebAPI.Core.Models.user
{
    public partial class domains
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Key]
        [Column(Order = 1)]
        [Index(IsUnique = true)] 
        [StringLength(128)]
        public string domain { get; set; }


        [StringLength(128)]
        public string displayname { get; set; }
        public string mailDomain { get; set; }

        [Column(TypeName = "text")]
        public string remark { get; set; }

        public int isused { get; set; }


    }
}