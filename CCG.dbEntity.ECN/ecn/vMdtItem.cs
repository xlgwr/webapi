namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("vMdtItem")]
    public partial class vMdtItem
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string ECN_Nbr { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string ECN_Domain { get; set; }

        [StringLength(18)]
        public string pt_part { get; set; }

        [StringLength(32)]
        public string ECN_Title { get; set; }

        [StringLength(60)]
        public string ECN_Cmmt { get; set; }

        [StringLength(20)]
        public string ECN_UserID { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ECN_Eff_date { get; set; }

        [StringLength(8)]
        public string ECN_Status { get; set; }

        [StringLength(4)]
        public string pt_rev { get; set; }

        [StringLength(4)]
        public string pt_rev2 { get; set; }

        [StringLength(18)]
        public string mdt_part_tmp { get; set; }

        [StringLength(18)]
        public string mdt_rev { get; set; }

        [StringLength(18)]
        public string mdt_rev_tmp { get; set; }

        [StringLength(50)]
        public string mdt_M_tmp { get; set; }

        [StringLength(50)]
        public string mdt_Model_tmp { get; set; }

        [StringLength(50)]
        public string mdt_reason { get; set; }

        [StringLength(50)]
        public string mdt_content { get; set; }

        [StringLength(50)]
        public string def1 { get; set; }

        [StringLength(50)]
        public string def2 { get; set; }

        public decimal? deci1 { get; set; }

        public decimal? deci2 { get; set; }

        public int? int1 { get; set; }

        public int? int2 { get; set; }

        [Column(TypeName = "text")]
        public string remark { get; set; }

        [StringLength(20)]
        public string mdt_UserID { get; set; }

        public long? mdt_cmtIndx { get; set; }
    }
}
