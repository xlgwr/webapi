namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addMenusDisplayTitle : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.menus", "displayTitle", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.menus", "funcTypeTitle", c => c.String(nullable: false, maxLength: 128));
        }
        
        public override void Down()
        {
            DropColumn("dbo.menus", "funcTypeTitle");
            DropColumn("dbo.menus", "displayTitle");
        }
    }
}
