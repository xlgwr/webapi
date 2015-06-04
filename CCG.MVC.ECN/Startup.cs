using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CCG.MVC.ECN.Startup))]
namespace CCG.MVC.ECN
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
