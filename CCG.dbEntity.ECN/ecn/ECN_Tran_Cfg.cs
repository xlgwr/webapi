namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Tran_Cfg
    {
        [Key]
        [StringLength(50)]
        public string Tran_Ref { get; set; }

        [StringLength(20)]
        public string Tran_Type { get; set; }

        [StringLength(1000)]
        public string Tran_Desc { get; set; }

        [StringLength(30)]
        public string Tran_Cre_User { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Tran_Cre_Date { get; set; }

        [StringLength(30)]
        public string Tran_Upd_user { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Tran_Upd_date { get; set; }
    }
}
