namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_log
    {
        [Key]
        public int log_id { get; set; }

        [StringLength(30)]
        public string log_User { get; set; }

        [StringLength(15)]
        public string log_IP { get; set; }

        [StringLength(30)]
        public string log_pcUser { get; set; }

        [StringLength(30)]
        public string log_Op { get; set; }

        public DateTime? log_Date { get; set; }

        [StringLength(300)]
        public string log_KeyInfo { get; set; }

        [StringLength(50)]
        public string log_Desc { get; set; }
    }
}
