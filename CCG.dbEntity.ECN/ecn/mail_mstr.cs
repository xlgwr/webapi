namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class mail_mstr
    {
        [Key]
        public int mail_id { get; set; }

        [Required]
        [StringLength(8000)]
        public string mail_to { get; set; }

        [Required]
        [StringLength(8000)]
        public string mail_cc { get; set; }

        [Required]
        [StringLength(8000)]
        public string mail_bcc { get; set; }

        [Required]
        [StringLength(1000)]
        public string mail_subject { get; set; }

        [Column(TypeName = "text")]
        [Required]
        public string mail_body { get; set; }

        [Required]
        [StringLength(1)]
        public string mail_status { get; set; }

        public DateTime? mail_send_time { get; set; }

        public byte mail_type { get; set; }

        [Required]
        [StringLength(1)]
        public string mail_attachment { get; set; }

        public DateTime mail_schedule { get; set; }

        [Required]
        [StringLength(200)]
        public string mail_sender { get; set; }

        [Required]
        [StringLength(8000)]
        public string mail_msg { get; set; }

        [StringLength(30)]
        public string mail_cre_user { get; set; }

        public DateTime? mail_cre_date { get; set; }

        [StringLength(30)]
        public string mail_upd_user { get; set; }

        public DateTime? mail_upd_date { get; set; }
    }
}
