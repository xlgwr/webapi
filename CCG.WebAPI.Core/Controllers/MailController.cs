using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CCG.WebAPI.Core.Controllers
{
    [Authorize]
    [RoutePrefix("api/Mail")]
    public class MailController : ApiController
    {
    }
}
