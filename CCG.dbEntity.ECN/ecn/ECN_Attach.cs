namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Attach
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

        [Key]
        [Column(Order = 2)]
        [StringLength(8)]
        public string ECN_type { get; set; }

        [Key]
        [Column(Order = 3)]
        [StringLength(50)]
        public string ECN_FileName { get; set; }

        [Required]
        [StringLength(300)]
        public string ECN_File { get; set; }

        public decimal? ECN_FileSize { get; set; }

        [StringLength(20)]
        public string ECN_updateby { get; set; }

        public DateTime? ECN_UpdateDate { get; set; }
    }
}
