namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class mdt_mstr
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(8)]
        public string mdt_Domain { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(8)]
        public string mdt_Nbr { get; set; }

        [Key]
        [Column(Order = 2)]
        public long mdt_cmtIndx { get; set; }

        [StringLength(50)]
        public string mdt_doc_type { get; set; }

        [StringLength(50)]
        public string mdt_type { get; set; }

        [StringLength(32)]
        public string mdt_Title { get; set; }

        [StringLength(60)]
        public string mdt_Cmmt { get; set; }

        [StringLength(50)]
        public string mdt_so { get; set; }

        [StringLength(50)]
        public string mdt_efrom { get; set; }

        public DateTime? mdt_efromtime { get; set; }

        [StringLength(50)]
        public string mdt_eaudit { get; set; }

        public DateTime? mdt_eaudittime { get; set; }

        public DateTime? mdt_etime { get; set; }

        [StringLength(50)]
        public string mdt_mpcfrom { get; set; }

        public DateTime? mdt_mpcfromtime { get; set; }

        [StringLength(50)]
        public string mdt_mpcaudit { get; set; }

        public DateTime? mdt_mpcaudittime { get; set; }

        public DateTime? mdt_mpctime { get; set; }

        [StringLength(50)]
        public string mdt_mpcStock { get; set; }

        [StringLength(50)]
        public string mdt_mpcNoQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcTtlQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcNeedQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcMoqQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcWaitQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcUsedQty { get; set; }

        [StringLength(50)]
        public string mdt_mpcMoney { get; set; }

        [StringLength(50)]
        public string mdt_mpcUseDay { get; set; }

        [StringLength(50)]
        public string mdt_pur { get; set; }

        [StringLength(50)]
        public string mdt_lastfrom { get; set; }

        public DateTime? mdt_lastfromtime { get; set; }

        [StringLength(50)]
        public string mdt_lastaudit { get; set; }

        public DateTime? mdt_lastaudittime { get; set; }

        public DateTime? mdt_lasttime { get; set; }

        [StringLength(50)]
        public string mdt_lastDesc { get; set; }

        [StringLength(50)]
        public string mdt_lastOther { get; set; }

        [StringLength(50)]
        public string mdt_EffDay { get; set; }

        [StringLength(50)]
        public string def1 { get; set; }

        [StringLength(50)]
        public string def2 { get; set; }

        public decimal? deci1 { get; set; }

        public decimal? deci2 { get; set; }

        public DateTime? date1 { get; set; }

        public DateTime? date2 { get; set; }

        public int? int1 { get; set; }

        public int? int2 { get; set; }

        [Column(TypeName = "text")]
        public string remark { get; set; }

        [StringLength(20)]
        public string mdt_UserID { get; set; }
    }
}
