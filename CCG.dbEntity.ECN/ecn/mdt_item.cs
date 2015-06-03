namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class mdt_item
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string mdt_Domain { get; set; }

        [Key]
        [Column(Order = 1)]
        public long mdt_cmtIndx { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(8)]
        public string mdt_Nbr { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(18)]
        public string mdt_part { get; set; }

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
    }
}
