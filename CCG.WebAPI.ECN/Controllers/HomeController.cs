using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CCG.WebAPI.ECN.Controllers
{
    public class HomeController : Controller
    {
     
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }

        [Authorize]
        public ActionResult About()
        {
            ViewBag.Title = "About";
            return View();
        }
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }
    }
}
