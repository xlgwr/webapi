using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CCG.WebAPI.ECN.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {


        //[Authorize]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Title = "About";
            return View();
        }
        public ActionResult Login(string redirectUrl)
        {
            return View();

        }
    }
}
