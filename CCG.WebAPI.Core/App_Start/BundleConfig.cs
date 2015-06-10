using System.Web;
using System.Web.Optimization;

namespace CCG.WebAPI.Core
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            //2.X
            bundles.Add(new ScriptBundle("~/bundles/jquerylast").Include(
                       "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",
                      "~/bower_components/normalize.css/normalize.css",
                      "~/Content/ligerUI/skins/Aqua/css/ligerui.min.css",
                      "~/Content/ligerUI/skins/Gray2014/css/all.css",
                      "~/Content/site.css",
                      "~/Content/commMe.css",
                      "~/Content/ieFix.css",
                      "~/Content/ligerUIme.css"));
            bundles.Add(new StyleBundle("~/Content/commMe").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap-theme.css",
                      "~/bower_components/normalize.css/normalize.css",
                      "~/Content/commMe.css",
                      "~/Content/ieFix.css"));

            bundles.Add(new StyleBundle("~/Content/ligerUI").Include(
                        "~/Content/ligerUI/skins/Aqua/css/ligerui-all.css",
                        "~/Content/ligerUI/skins/Gray2014/css/all.css",
                        "~/Content/ligerUIme.css"));
            //add other
            
            //1.11.X   
            //base js
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/bower_components/jquery/dist/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/avalon").Include(
                        "~/bower_components/avalon/min/avalon.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/ligerUI").Include(
                        "~/Content/ligerUI/js/ligerui.min.js"));


            //use define

            bundles.Add(new ScriptBundle("~/bundles/me").Include(
                        "~/Scripts/me/me*"));

            bundles.Add(new ScriptBundle("~/bundles/auth").Include(
                        "~/Scripts/me/auth*"));

            bundles.Add(new ScriptBundle("~/bundles/init").Include(
                        "~/Scripts/me/init*"));

            bundles.Add(new ScriptBundle("~/bundles/index").Include(
                        "~/Scripts/me/index*"));

            bundles.Add(new ScriptBundle("~/bundles/about").Include(
                        "~/Scripts/me/about*"));

            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                        "~/Scripts/me/login*"));


        }
    }
}
