namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using CCG.WebAPI.Core.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<CCG.WebAPI.Core.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(CCG.WebAPI.Core.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Database.ExecuteSqlCommand("delete from [domains]");

            context.domains.AddOrUpdate(
                new domains { domain = "CCAL.NET", displayname = "CCAL", isused = 0, remark = "CCAL.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CCG.NET", displayname = "CCG", isused = 0, remark = "CCG.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CML.NET", displayname = "CML", isused = 0, remark = "CML.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CCL.NET", displayname = "CCL", isused = 0, remark = "CCL.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CCM.NET", displayname = "CCM", isused = 0, remark = "CCM.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CIM.NET", displayname = "CIM", isused = 0, remark = "CIM.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CCSZ.NET", displayname = "CCSZ", isused = 0, remark = "CCSZ.NET", mailDomain = "cclmotors.com" },
                new domains { domain = "CCJX.NET", displayname = "CCJX", isused = 0, remark = "CCJX.NET", mailDomain = "cclmotors.com" }
            );
        }
    }
}
