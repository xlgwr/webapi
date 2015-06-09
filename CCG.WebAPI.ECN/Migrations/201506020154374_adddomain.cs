namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class adddomain : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.domains",
                c => new
                    {
                        Id = c.Long(nullable: false),
                        domain = c.String(nullable: false, maxLength: 128),
                        displayname = c.String(maxLength: 128),
                        remark = c.String(unicode: false, storeType: "text"),
                        isused = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.domain });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.domains");
        }
    }
}
