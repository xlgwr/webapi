namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initdb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.domains",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        domain = c.String(nullable: false, maxLength: 128),
                        displayname = c.String(maxLength: 128),
                        mailDomain = c.String(),
                        remark = c.String(unicode: false, storeType: "text"),
                        isused = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.domain })
                .Index(t => t.domain, unique: true);
            
            CreateTable(
                "dbo.logs",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        domain = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(nullable: false, maxLength: 128),
                        types = c.String(),
                        pcName = c.String(),
                        IP = c.String(),
                        pcIE = c.String(),
                        clienturl = c.String(),
                        pcSystem = c.String(),
                        lognTime = c.DateTime(nullable: false),
                        remark = c.String(),
                        Userid = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Id, t.domain, t.UserName })
                .ForeignKey("dbo.AspNetUsers", t => t.Userid)
                .Index(t => t.Userid);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.mailItems",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        smtpServer = c.String(),
                        portNumber = c.Int(nullable: false),
                        mailname = c.String(),
                        mailpasswd = c.String(),
                        mailFrom = c.String(nullable: false),
                        mailSubject = c.String(nullable: false),
                        mailContent = c.String(),
                        mailpriority = c.Int(nullable: false),
                        isAnonymous = c.Boolean(nullable: false),
                        mails_Id = c.Long(),
                        mails_domain = c.String(maxLength: 128),
                        mails_UserName = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.mails", t => new { t.mails_Id, t.mails_domain, t.mails_UserName })
                .Index(t => new { t.mails_Id, t.mails_domain, t.mails_UserName });
            
            CreateTable(
                "dbo.mails",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        domain = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Id, t.domain, t.UserName });
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.mailItems", new[] { "mails_Id", "mails_domain", "mails_UserName" }, "dbo.mails");
            DropForeignKey("dbo.logs", "Userid", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.mailItems", new[] { "mails_Id", "mails_domain", "mails_UserName" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.logs", new[] { "Userid" });
            DropIndex("dbo.domains", new[] { "domain" });
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.mails");
            DropTable("dbo.mailItems");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.logs");
            DropTable("dbo.domains");
        }
    }
}
