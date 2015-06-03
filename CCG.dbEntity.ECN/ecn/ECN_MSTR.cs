namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_MSTR
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string ECN_Nbr { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string ECN_Domain { get; set; }

        [StringLength(8)]
        public string ECN_doc_type { get; set; }

        [StringLength(8)]
        public string ECN_type { get; set; }

        [StringLength(32)]
        public string ECN_Title { get; set; }

        [StringLength(60)]
        public string ECN_Cmmt { get; set; }

        public decimal? ECN_Exp_Cost { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Date { get; set; }

        [StringLength(10)]
        public string ECN_Init { get; set; }

        [StringLength(8)]
        public string ECN_User1 { get; set; }

        [StringLength(8)]
        public string ECN_User2 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_sub_Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Eff_date { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ECN_cmtIndx { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_man_Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_End_Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Rel_Date { get; set; }

        [StringLength(30)]
        public string ECN_Approval { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Appr_Date { get; set; }

        [StringLength(8)]
        public string ECN_Distr { get; set; }

        public bool? ECN_Replan { get; set; }

        [StringLength(8)]
        public string ECN_Status { get; set; }

        [StringLength(8)]
        public string ECN_Nbr_Fr { get; set; }

        [StringLength(8)]
        public string ECN_Nbr_To { get; set; }

        [StringLength(28)]
        public string ECN_Name { get; set; }

        [StringLength(8)]
        public string ECN_Assign { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Open_Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Close_Date { get; set; }

        [StringLength(8)]
        public string ECN_ECR_Dspn { get; set; }

        [StringLength(50)]
        public string ECN_Secure_text { get; set; }

        [StringLength(50)]
        public string ECN_Secure_item { get; set; }

        [StringLength(50)]
        public string ECN_Secure_stct { get; set; }

        [StringLength(50)]
        public string ECN_Secure_routing { get; set; }

        [StringLength(50)]
        public string ECN_Secure_admn { get; set; }

        public bool? ECN_Seqrev_off { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Selected_Eff { get; set; }

        public bool? ECN_Batched { get; set; }

        public bool? ECN_Reprocess { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Dist_Date { get; set; }

        public bool? ECN_Qad01 { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Confirm_Date { get; set; }

        [StringLength(300)]
        public string ECN_Attach { get; set; }

        [StringLength(20)]
        public string ECN_class { get; set; }

        public DateTime? ECN_Mod_Date { get; set; }

        [StringLength(20)]
        public string ECN_UserID { get; set; }
    }
}
