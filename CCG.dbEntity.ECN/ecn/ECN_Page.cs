namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ECN_Page
    {
        [Key]
        public int page_ID { get; set; }

        [StringLength(8)]
        public string page_domain { get; set; }

        [StringLength(50)]
        public string page_ch { get; set; }

        [StringLength(50)]
        public string page_en { get; set; }

        [StringLength(300)]
        public string page_loc { get; set; }

        [StringLength(50)]
        public string page_fun { get; set; }

        public int? page_indx { get; set; }

        [StringLength(50)]
        public string page_desc { get; set; }
    }
}
