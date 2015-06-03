namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Type
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string ET_Domain { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string ET_Doc_Type { get; set; }

        [Key]
        [Column(Order = 2)]
        [StringLength(8)]
        public string ET_Type { get; set; }

        [StringLength(5)]
        public string ET_Seq { get; set; }

        [StringLength(100)]
        public string ET_Fun { get; set; }

        [StringLength(20)]
        public string ET_CreateBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ET_CreateDate { get; set; }

        [StringLength(20)]
        public string ET_UpdateBy { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ET_UpdateDate { get; set; }
    }
}
