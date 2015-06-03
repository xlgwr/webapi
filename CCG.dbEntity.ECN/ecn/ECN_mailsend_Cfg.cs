namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_mailsend_Cfg
    {
        [Key]
        public int ECN_ID { get; set; }

        [StringLength(8)]
        public string ECN_Domain { get; set; }

        [StringLength(8)]
        public string ECN_Type { get; set; }

        [StringLength(50)]
        public string ECN_ProdLine { get; set; }

        [StringLength(100)]
        public string ECN_Cmmt { get; set; }

        [StringLength(80)]
        public string ECN_Appr_Dept { get; set; }

        [StringLength(100)]
        public string ECN_Dept_Desc { get; set; }

        [StringLength(100)]
        public string ECN_EMP1 { get; set; }

        [StringLength(100)]
        public string ECN_Emp1_Addr { get; set; }

        [StringLength(100)]
        public string ECN_EMP2 { get; set; }

        [StringLength(100)]
        public string ECN_EMP2_Addr { get; set; }

        [StringLength(100)]
        public string ECN_EMP3 { get; set; }

        [StringLength(100)]
        public string ECN_EMP3_Addr { get; set; }

        public decimal? ECN_DeadLine { get; set; }

        [StringLength(300)]
        public string ECN_DL_Addr { get; set; }

        [StringLength(100)]
        public string ECN_DL_Freq { get; set; }

        public bool? ECN_Invalid { get; set; }

        [StringLength(50)]
        public string ECN_Rmks { get; set; }

        [StringLength(20)]
        public string ECN_Cre_user { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Cre_Date { get; set; }

        [StringLength(20)]
        public string ECN_upd_user { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_upd_Date { get; set; }
    }
}
