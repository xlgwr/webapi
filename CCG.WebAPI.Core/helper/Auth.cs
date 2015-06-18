using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http.Results;

namespace CCG.WebAPI.Core.helper
{
    public class AuthAttribute : FilterAttribute,  IAuthenticationFilter, IActionFilter
    {
        public const string CookieName = "AccessToken";
        public string CaptureTokenUri { get;private set; }
        public AuthAttribute(string captureTokenUri)
        {
            this.CaptureTokenUri = captureTokenUri;
            //get { throw new NotImplementedException(); }
        }


        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            HttpRequestMessage request = context.Request;
           

            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            if (authorization==null)
            {
                return Task.FromResult<object>(null);
                //context.ActionContext.Response
            }

            return Task.FromResult<object>(null);

           // throw new NotImplementedException();
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            if (authorization != null)
            {
                string redirectUri = string.Format("{0}?requestUri={1}", this.CaptureTokenUri, request.RequestUri);

                context.Result = new RedirectResult(new Uri(redirectUri), request);
                //context.ActionContext.Response
            }
            context.Result = new RedirectResult(new Uri("~/home/logon"), request);
               
            return Task.FromResult<object>(null);
           
           // throw new NotImplementedException();
        }

        public Task<HttpResponseMessage> ExecuteActionFilterAsync(System.Web.Http.Controllers.HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            throw new NotImplementedException();
        }
    }
}