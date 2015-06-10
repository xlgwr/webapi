using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using CCG.WebAPI.Core.Models;
using CCG.WebAPI.Core.Providers;
using CCG.WebAPI.Core.Results;
using System.Threading.Tasks;

namespace CCG.WebAPI.Core.Controllers
{
    [RoutePrefix("api/domains")]
    public class DomainController : ApiController
    {
        private ApplicationDbContext _domainManager;
        public DomainController() { }
        public DomainController(ApplicationDbContext domainManager,
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            _domainManager = domainManager;
            AccessTokenFormat = accessTokenFormat;
        }
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        public ApplicationDbContext domainManager
        {
            get
            {
                return _domainManager ?? Request.GetOwinContext().Get<ApplicationDbContext>();
            }
            private set
            {
                _domainManager = value;
            }
        }
        [AllowAnonymous]
        [Route("getDomains")]
        public async Task<ICollection<domains>> getDomains()
        {
            var models = Task<ICollection<domains>>.Run(() =>
            {
                return domainManager.domains.ToList();
            });
            return await models;

        }
        protected override void Dispose(bool disposing)
        {
            if (disposing && _domainManager != null)
            {
                _domainManager.Dispose();
                _domainManager = null;
            }
            base.Dispose(disposing);
        }
    }
}
