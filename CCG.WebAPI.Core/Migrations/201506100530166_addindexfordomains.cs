namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addindexfordomains : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.domains", "domain", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.domains", new[] { "domain" });
        }
    }
}
