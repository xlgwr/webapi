namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addmaildomainfordomain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.domains", "mailDomain", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.domains", "mailDomain");
        }
    }
}
