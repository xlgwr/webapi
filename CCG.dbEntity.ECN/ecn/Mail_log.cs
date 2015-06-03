namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Mail_log
    {
        public int ID { get; set; }

        [StringLength(50)]
        public string ProgID { get; set; }

        [StringLength(500)]
        public string INFOR { get; set; }

        public DateTime? PTime { get; set; }

        [StringLength(10)]
        public string IsSuccess { get; set; }

        [StringLength(30)]
        public string IP { get; set; }
    }
}
