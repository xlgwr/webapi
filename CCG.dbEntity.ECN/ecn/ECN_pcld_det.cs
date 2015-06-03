namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_pcld_det
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string pcld_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string pcld_domain { get; set; }

        public int? pcld_copies { get; set; }

        [StringLength(8)]
        public string pcld_dev { get; set; }

        [Column(TypeName = "date")]
        public DateTime? pcld_expire { get; set; }

        [StringLength(8)]
        public string pcld_group { get; set; }

        [StringLength(50)]
        public string pcld_remark { get; set; }

        [StringLength(8)]
        public string pcld_userId { get; set; }

        [Column(TypeName = "date")]
        public DateTime? pcld_mod_date { get; set; }
    }
}
