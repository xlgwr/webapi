using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace CCG.WebAPI.Core.Controllers
{
    [AllowAnonymous]
    public class ManageController : Controller
    {
        public ActionResult index(string title)
        {
            ViewBag.Title = title;
            return View();
        }
        public ActionResult ChangePassword(string title)
        {
            ViewBag.Title = title;
            return View();
        }


        public ActionResult SetPassword(string title)
        {
            ViewBag.Title = title;
            return View();
        }
    }
}
