namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class maila_det
    {
        [Key]
        [Column(Order = 0)]
        public int maila_id { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int maila_mailid { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(300)]
        public string maila_attach { get; set; }

        [Column(TypeName = "image")]
        public byte[] maila_content { get; set; }
    }
}
