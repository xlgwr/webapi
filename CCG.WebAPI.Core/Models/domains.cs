using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CCG.WebAPI.Core.Models
{
    public partial class domains
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(128)]
        public string domain { get; set; }


        [StringLength(128)]
        public string displayname { get; set; }

        [Column(TypeName = "text")]
        public string remark { get; set; }

        public int isused { get; set; }


    }
}