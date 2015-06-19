using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CCG.WebAPI.Core.Models;
using CCG.WebAPI.Core.Models.user;

namespace CCG.WebAPI.Core.helper
{
    public class getClientInfo
    {
        public static string GetOSNameByUserAgent(string userAgent)
        {
            string osVersion = null;

            if (userAgent.Contains("NT 10"))
            {
                osVersion = "Windows 10";
            }
            else if (userAgent.Contains("NT 6.1"))
            {
                osVersion = "Windows 7/Server 2008 r2";
            }
            else if (userAgent.Contains("NT 6.2"))
            {
                osVersion = "Windows 8";
            }
            else if (userAgent.Contains("NT 6.3"))
            {
                osVersion = "Windows 8.1";
            }
            else if (userAgent.Contains("NT 6.0"))
            {
                osVersion = "Windows Vista/Server 2008";
            }
            else if (userAgent.Contains("NT 5.2"))
            {
                osVersion = "Windows Server 2003";
            }
            else if (userAgent.Contains("NT 5.1"))
            {
                osVersion = "Windows XP";
            }
            else if (userAgent.Contains("NT 5"))
            {
                osVersion = "Windows 2000";
            }
            else if (userAgent.Contains("NT 4"))
            {
                osVersion = "Windows NT4";
            }
            else if (userAgent.Contains("Windows NT"))
            {
                osVersion = "Windows NT other";
            }
            else if (userAgent.Contains("Me"))
            {
                osVersion = "Windows Me";
            }
            else if (userAgent.Contains("98"))
            {
                osVersion = "Windows 98";
            }
            else if (userAgent.Contains("95"))
            {
                osVersion = "Windows 95";
            }
            else if (userAgent.Contains("Mac"))
            {
                osVersion = "Mac";
            }
            else if (userAgent.Contains("Unix"))
            {
                osVersion = "UNIX";
            }
            else if (userAgent.Contains("Linux"))
            {
                osVersion = "Linux";
            }
            else if (userAgent.Contains("SunOS"))
            {
                osVersion = "SunOS";
            }
            return osVersion;
        }

        public static logs initlogs(logs model, HttpRequest Request)
        {
            //获取URL地址
            string url = Request.Url.ToString();

            //获取IP地址
            string ips = Request.UserHostAddress.ToString();

            string pcname = getPCname(ips);

            //浏览器
            string fr = Request.Browser.Type.ToString();

            string cp;//= Request.UserAgent.ToString()
            //操作系统
            var tmpcp = GetOSNameByUserAgent(Request.UserAgent.ToString());

            cp = tmpcp == null ? Request.UserAgent.ToString() : tmpcp;

            //浏览器版本号
            var txtbrows = Request.Browser.ClrVersion.ToString();
            // txtUrl.Text = Request.ServerVariables["http_referer"];

            //model.clienturl = url;
            model.IP = ips;
            model.pcName = pcname;
            model.pcIE = fr + " " + txtbrows;
            model.pcSystem = cp;

            model.lognTime = DateTime.Now;
            model.reflashlognTime = DateTime.Now;

            return model;
        }     //获取电脑名
        public static string getPCname(string ip)
        {
            string sPCName = "";
            try
            {
                System.Net.IPHostEntry ihe = System.Net.Dns.GetHostEntry(ip);    //根据ip对象创建主机对象
                sPCName = ihe.HostName;       //输出主机名
            }
            catch (Exception) { }
            return sPCName;
        }
    }

}