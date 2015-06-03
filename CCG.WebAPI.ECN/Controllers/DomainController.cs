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
using CCG.WebAPI.ECN.Models;
using CCG.WebAPI.ECN.Providers;
using CCG.WebAPI.ECN.Results;
using System.Threading.Tasks;

namespace CCG.WebAPI.ECN.Controllers
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
        
        [Route("getDomains")]
        public IQueryable<domains> getDomains()
        {
            return domainManager.domains;

        }
    }
}
