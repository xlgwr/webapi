namespace CCG.dbEntity.ECN.ecn
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class dbECN : DbContext
    {
        public dbECN()
            : base("name=dbECN")
        {
        }

        public virtual DbSet<ECN_Attach> ECN_Attach { get; set; }
        public virtual DbSet<ECN_Flow_Cfg> ECN_Flow_Cfg { get; set; }
        public virtual DbSet<ECN_Item> ECN_Item { get; set; }
        public virtual DbSet<ECN_mailsend_Cfg> ECN_mailsend_Cfg { get; set; }
        public virtual DbSet<ECN_MSTR> ECN_MSTR { get; set; }
        public virtual DbSet<ECN_Page> ECN_Page { get; set; }
        public virtual DbSet<ECN_pcld_det> ECN_pcld_det { get; set; }
        public virtual DbSet<ECN_PS> ECN_PS { get; set; }
        public virtual DbSet<ECN_Tran_Cfg> ECN_Tran_Cfg { get; set; }
        public virtual DbSet<ECN_Type> ECN_Type { get; set; }
        public virtual DbSet<mail_mstr> mail_mstr { get; set; }
        public virtual DbSet<mdt_item> mdt_item { get; set; }
        public virtual DbSet<mdt_mstr> mdt_mstr { get; set; }
        public virtual DbSet<ECN_Combine_Data> ECN_Combine_Data { get; set; }
        public virtual DbSet<ECN_item_tmp> ECN_item_tmp { get; set; }
        public virtual DbSet<ECN_log> ECN_log { get; set; }
        public virtual DbSet<Mail_log> Mail_log { get; set; }
        public virtual DbSet<maila_det> maila_det { get; set; }
        public virtual DbSet<vEcnitem> vEcnitem { get; set; }
        public virtual DbSet<vMdtItem> vMdtItem { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ECN_Attach>()
                .Property(e => e.ECN_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Attach>()
                .Property(e => e.ECN_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Attach>()
                .Property(e => e.ECN_doc_type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Attach>()
                .Property(e => e.ECN_type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Attach>()
                .Property(e => e.ECN_FileSize)
                .HasPrecision(18, 4);

            modelBuilder.Entity<ECN_Flow_Cfg>()
                .Property(e => e.Flow_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Flow_Cfg>()
                .Property(e => e.Flow_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Flow_Cfg>()
                .Property(e => e.Flow_Doc_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Flow_Cfg>()
                .Property(e => e.Flow_ECN_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_domain)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_ECNNbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Doc_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_site)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_part)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_UM)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_part_type)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_rev)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_group)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_prod_line)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_dsgn_grp)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Status)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Draw)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Drwg_loc)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Drwg_size)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_PM_code)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Yield_Pct)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Price)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Promo)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_break_cat)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Loc)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_Tran_type)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Item>()
                .Property(e => e.pt_userid)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_ProdLine)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_Appr_Dept)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_DeadLine)
                .HasPrecision(10, 2);

            modelBuilder.Entity<ECN_mailsend_Cfg>()
                .Property(e => e.ECN_DL_Addr)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_doc_type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Exp_Cost)
                .HasPrecision(20, 2);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Init)
                .IsFixedLength();

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_User1)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_User2)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Approval)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Distr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Status)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Nbr_Fr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Nbr_To)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Name)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Assign)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_ECR_Dspn)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Secure_text)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Secure_item)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Secure_stct)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Secure_routing)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_Secure_admn)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_MSTR>()
                .Property(e => e.ECN_UserID)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Page>()
                .Property(e => e.page_domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Page>()
                .Property(e => e.page_en)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_id)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_dev)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_group)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_remark)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_pcld_det>()
                .Property(e => e.pcld_userId)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Domain)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_ECNNbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Doc_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Par)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Comp)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Ref)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Qty_per)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Scrp_pct)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Ps_Code)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_lt_Off)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Op)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Item_No)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Fcst_Pct)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Group)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_Process)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_PS>()
                .Property(e => e.ps_userid)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Tran_Cfg>()
                .Property(e => e.Tran_Type)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Type>()
                .Property(e => e.ET_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Type>()
                .Property(e => e.ET_Doc_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Type>()
                .Property(e => e.ET_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Type>()
                .Property(e => e.ET_Seq)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_to)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_cc)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_bcc)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_subject)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_body)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_status)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_attachment)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_sender)
                .IsUnicode(false);

            modelBuilder.Entity<mail_mstr>()
                .Property(e => e.mail_msg)
                .IsUnicode(false);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.mdt_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.mdt_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.deci1)
                .HasPrecision(18, 4);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.deci2)
                .HasPrecision(18, 4);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.remark)
                .IsUnicode(false);

            modelBuilder.Entity<mdt_item>()
                .Property(e => e.mdt_UserID)
                .IsUnicode(false);

            modelBuilder.Entity<mdt_mstr>()
                .Property(e => e.deci1)
                .HasPrecision(18, 4);

            modelBuilder.Entity<mdt_mstr>()
                .Property(e => e.deci2)
                .HasPrecision(18, 4);

            modelBuilder.Entity<mdt_mstr>()
                .Property(e => e.remark)
                .IsUnicode(false);

            modelBuilder.Entity<mdt_mstr>()
                .Property(e => e.mdt_UserID)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_Doc_type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_ECN_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_ECN_nbr)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_Chr01)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_Combine_Data>()
                .Property(e => e.cmbn_User)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_domain)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_ECNNbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Doc_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Type)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_site)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_part)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_UM)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_part_type)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_rev)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_group)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_prod_line)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_dsgn_grp)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Status)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Draw)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Drwg_loc)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Drwg_size)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_PM_code)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Yield_Pct)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Price)
                .HasPrecision(20, 10);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Promo)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_break_cat)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Loc)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_ProdlineOld)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_Tran_type)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_item_tmp>()
                .Property(e => e.pt_userid)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_log>()
                .Property(e => e.log_IP)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<ECN_log>()
                .Property(e => e.log_Op)
                .IsUnicode(false);

            modelBuilder.Entity<ECN_log>()
                .Property(e => e.log_Desc)
                .IsUnicode(false);

            modelBuilder.Entity<Mail_log>()
                .Property(e => e.ProgID)
                .IsUnicode(false);

            modelBuilder.Entity<Mail_log>()
                .Property(e => e.IsSuccess)
                .IsFixedLength();

            modelBuilder.Entity<Mail_log>()
                .Property(e => e.IP)
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.ECN_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.ECN_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.pt_part)
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.ECN_UserID)
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.ECN_Status)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.pt_rev)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vEcnitem>()
                .Property(e => e.pt_rev2)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.ECN_Nbr)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.ECN_Domain)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.pt_part)
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.ECN_UserID)
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.ECN_Status)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.pt_rev)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.pt_rev2)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.deci1)
                .HasPrecision(18, 4);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.deci2)
                .HasPrecision(18, 4);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.remark)
                .IsUnicode(false);

            modelBuilder.Entity<vMdtItem>()
                .Property(e => e.mdt_UserID)
                .IsUnicode(false);
        }
    }
}
