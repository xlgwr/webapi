using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CCG.WebAPI.Core.Models.user
{
    public partial class menus
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(128)]
        public string menutype { get; set; }

        [Required]
        [StringLength(128)]
        public string funcType { get; set; }

        [Required]
        public long orderId { get; set; }


        [Required]
        [StringLength(128)]
        public string displayname { get; set; }
        
        [Required]
        public string mainUrl { get; set; }
        public string secondUrl { get; set; }

        [Column(TypeName = "text")]
        public string remark { get; set; }

        public int isused { get; set; }


    }
}