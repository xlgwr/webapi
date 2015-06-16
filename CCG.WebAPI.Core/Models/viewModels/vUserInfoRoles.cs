using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCG.WebAPI.Core.Models.viewModels
{
    public class vUserInfoRoles
    {
        public string Email { get; set; }

        public string UserName { get; set; }

        public string Dept { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }

        public virtual ICollection<string> RoleNames { get; set; }
    }
}