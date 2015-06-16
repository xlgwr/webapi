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
using CCG.WebAPI.Core.Models.user;
using CCG.WebAPI.Core.Providers;
using CCG.WebAPI.Core.Results;
using System.Threading.Tasks;
using CCG.WebAPI.Core.helper;
using System.Diagnostics;

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
                var dd= _domainManager ?? Request.GetOwinContext().Get<ApplicationDbContext>();
                dd.Database.Log = message => Trace.Write(message);
                return dd;
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

        [AllowAnonymous]
        [Route("saveLogs")]
        public async Task<object> saveLogs(logs model)
        {

            if (!ModelState.IsValid)
            {
                return model;
            }

            var initmodel = getClientInfo.initlogs(model, System.Web.HttpContext.Current.Request);


            var result = Task<int>.Run(() =>
            {
                var tmpuser = domainManager.Users.Where(u => u.Email.Equals(initmodel.UserName)).FirstOrDefault();
                if (tmpuser != null)
                {
                    initmodel.Userid = tmpuser.Id;
                    var tmpsave = domainManager.logs.Add(initmodel);
                    var tmpsaveflag = domainManager.SaveChanges();

                    return tmpsaveflag;

                }
                return 0;

            });



            //if (!result.Succeeded)
            //{
            //    return GetErrorResult(result);
            //}

            return await result;
        }
        #region helper
        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
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
        #endregion
    }
}
