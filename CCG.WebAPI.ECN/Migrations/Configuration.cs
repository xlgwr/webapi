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

            context.domains.AddOrUpdate(
                new domains { Id = 1, domain = "CCG.NET", displayname = "CCG", isused = 0, remark = "CCG.NET" }
                );
        }
    }
}
