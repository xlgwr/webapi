namespace CCG.WebAPI.Core.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    using CCG.WebAPI.Core;
    using CCG.WebAPI.Core.Models;
    using CCG.WebAPI.Core.Models.user;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System.Diagnostics;
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

            var tmpadminexit = context.Users.Where(u => u.UserName.StartsWith("admin")).FirstOrDefault();

            if (tmpadminexit == null)
            {
                context.Database.ExecuteSqlCommand("delete from [logs]");
                context.Database.ExecuteSqlCommand("delete from [menus]");
                context.Database.ExecuteSqlCommand("delete from [AspNetUserLogins]");
                context.Database.ExecuteSqlCommand("delete from [AspNetUserClaims]");
                context.Database.ExecuteSqlCommand("delete from [AspNetUserRoles]");
                context.Database.ExecuteSqlCommand("delete from [AspNetRoles]");
                context.Database.ExecuteSqlCommand("delete from [AspNetUsers]");
                context.Database.ExecuteSqlCommand("delete from [mailItems]");
                context.Database.ExecuteSqlCommand("delete from [domains]");
                context.Database.ExecuteSqlCommand("delete from [mails]");

                context.Roles.AddOrUpdate(
                    new IdentityRole { Name = "admin" },
                    new IdentityRole { Name = "mail" }
                    );

                var adminuser = new ApplicationUser { Email = "admin@cclmotors.com", UserName = "admin@cclmotors.com", PasswordHash = new PasswordHasher().HashPassword("admin"), SecurityStamp = new PasswordHasher().HashPassword("admin") };

                var _user = new UserStore<ApplicationUser>(context);
                _user.AutoSaveChanges = true;
                var _usermanager = new UserManager<ApplicationUser>(_user);

                context.Users.AddOrUpdate(adminuser);

                context.SaveChanges();

                var tmpadmin = context.Users.Where(u => u.Email.Equals("admin@cclmotors.com")).SingleOrDefault();
                var tmprole = context.Roles.Where(r => r.Name.Equals("admin")).SingleOrDefault();

                if (tmpadmin != null && tmprole != null)
                {
                    _usermanager.AddToRole(tmpadmin.Id, "admin");
                    _usermanager.AddPassword(tmpadmin.Id, "admin");

                }

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
                context.menus.AddOrUpdate(
                    new menus { menutype = "public", orderId = 10, funcType = "Manage", mainUrl = "Manage/index", secondUrl = "", displayname = "index", isused = 1 },
                    new menus { menutype = "public", orderId = 20, funcType = "Manage", mainUrl = "Manage/ChangePassword", secondUrl = "", displayname = "ChangePassword", isused = 1 },
                    new menus { menutype = "admin", orderId = 30, funcType = "Manage", mainUrl = "Manage/SetPassword", secondUrl = "", displayname = "SetPassword", isused = 1 }

                );
                context.SaveChanges();
            }


        }
    }
}
