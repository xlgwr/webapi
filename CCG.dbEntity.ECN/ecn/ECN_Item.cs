namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Item
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string pt_domain { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string pt_ECNNbr { get; set; }

        [StringLength(8)]
        public string pt_Doc_Type { get; set; }

        [Required]
        [StringLength(8)]
        public string pt_Type { get; set; }

        [StringLength(8)]
        public string pt_site { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(18)]
        public string pt_part { get; set; }

        public DateTime? pt_date { get; set; }

        [StringLength(2)]
        public string pt_UM { get; set; }

        [StringLength(18)]
        public string pt_part_type { get; set; }

        [StringLength(4)]
        public string pt_rev { get; set; }

        [StringLength(80)]
        public string pt_group { get; set; }

        [StringLength(4)]
        public string pt_prod_line { get; set; }

        [StringLength(8)]
        public string pt_dsgn_grp { get; set; }

        [StringLength(8)]
        public string pt_Status { get; set; }

        [StringLength(18)]
        public string pt_Draw { get; set; }

        [StringLength(8)]
        public string pt_Drwg_loc { get; set; }

        [StringLength(30)]
        public string pt_Drwg_size { get; set; }

        [StringLength(24)]
        public string pt_desc1 { get; set; }

        [StringLength(24)]
        public string pt_desc2 { get; set; }

        public bool? pt_phantom { get; set; }

        [StringLength(30)]
        public string pt_PM_code { get; set; }

        public decimal? pt_Yield_Pct { get; set; }

        public decimal? pt_Price { get; set; }

        [Column(TypeName = "date")]
        public DateTime? pt_Added { get; set; }

        [StringLength(30)]
        public string pt_Promo { get; set; }

        [StringLength(30)]
        public string pt_break_cat { get; set; }

        [StringLength(30)]
        public string pt_Loc { get; set; }

        [StringLength(8)]
        public string pt_ProdlineOld { get; set; }

        [StringLength(60)]
        public string pt_longDesc1 { get; set; }

        [StringLength(60)]
        public string pt_longDesc2 { get; set; }

        [StringLength(60)]
        public string pt_longDesc3 { get; set; }

        [StringLength(50)]
        public string pt_Tran_Ref { get; set; }

        [StringLength(20)]
        public string pt_Tran_type { get; set; }

        [StringLength(1000)]
        public string pt_Tran_Desc { get; set; }

        [StringLength(20)]
        public string pt_userid { get; set; }

        [Column(TypeName = "date")]
        public DateTime? pt_mod_date { get; set; }
    }
}
