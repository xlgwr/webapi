namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Combine_Data
    {
        [Key]
        public int cmbn_ID { get; set; }

        [StringLength(8)]
        public string cmbn_Domain { get; set; }

        [StringLength(8)]
        public string cmbn_Doc_type { get; set; }

        [StringLength(8)]
        public string cmbn_ECN_Type { get; set; }

        [StringLength(300)]
        public string cmbn_ECN_nbr { get; set; }

        [StringLength(50)]
        public string cmbn_Chr01 { get; set; }

        [StringLength(20)]
        public string cmbn_User { get; set; }

        public DateTime? cmbn_Date { get; set; }
    }
}
