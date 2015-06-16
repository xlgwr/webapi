namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addmenus : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.menus",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        menutype = c.String(nullable: false, maxLength: 128),
                        funcType = c.String(nullable: false, maxLength: 128),
                        orderId = c.Long(nullable: false),
                        displayname = c.String(nullable: false, maxLength: 128),
                        mainUrl = c.String(nullable: false),
                        secondUrl = c.String(),
                        remark = c.String(unicode: false, storeType: "text"),
                        isused = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.menutype });
            
            DropColumn("dbo.AspNetUserClaims", "Discriminator");
            DropColumn("dbo.AspNetUserLogins", "Discriminator");
            DropColumn("dbo.AspNetUserRoles", "Discriminator");
            DropColumn("dbo.AspNetRoles", "Discriminator");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.AspNetUserRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.AspNetUserLogins", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.AspNetUserClaims", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            DropTable("dbo.menus");
        }
    }
}
