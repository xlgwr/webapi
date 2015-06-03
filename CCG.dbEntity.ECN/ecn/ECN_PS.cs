namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_PS
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string ps_Domain { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string ps_ECNNbr { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(8)]
        public string ps_Doc_Type { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(8)]
        public string ps_Type { get; set; }

        [Key]
        [Column(Order = 4)]
        [StringLength(18)]
        public string ps_Par { get; set; }

        [Key]
        [Column(Order = 5)]
        [StringLength(18)]
        public string ps_Comp { get; set; }

        [StringLength(12)]
        public string ps_Ref { get; set; }

        public decimal? ps_Qty_per { get; set; }

        public decimal? ps_Scrp_pct { get; set; }

        [StringLength(30)]
        public string ps_Ps_Code { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ps_Start { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ps_END { get; set; }

        [StringLength(8)]
        public string ps_lt_Off { get; set; }

        [StringLength(30)]
        public string ps_Op { get; set; }

        [StringLength(30)]
        public string ps_Item_No { get; set; }

        public decimal? ps_Fcst_Pct { get; set; }

        public bool? ps_Mandatory { get; set; }

        public bool? ps_Default { get; set; }

        [StringLength(80)]
        public string ps_Group { get; set; }

        [StringLength(80)]
        public string ps_Process { get; set; }

        [StringLength(50)]
        public string ps_Rmks { get; set; }

        public bool? ps_Cmmts { get; set; }

        public bool? Ps_Invalid { get; set; }

        [StringLength(20)]
        public string ps_userid { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ps_mod_Date { get; set; }
    }
}
