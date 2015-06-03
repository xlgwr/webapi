namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Flow_Cfg
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(4)]
        public string Flow_Nbr { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string Flow_Domain { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(8)]
        public string Flow_Doc_Type { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(8)]
        public string Flow_ECN_Type { get; set; }

        [StringLength(20)]
        public string Flow_Process { get; set; }

        [StringLength(30)]
        public string Flow_Process_Desc { get; set; }

        public bool? Flow_Optional { get; set; }

        [StringLength(20)]
        public string Flow_Cre_user { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Flow_Cre_Date { get; set; }

        [StringLength(20)]
        public string Flow_upd_user { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Flow_upd_Date { get; set; }
    }
}
