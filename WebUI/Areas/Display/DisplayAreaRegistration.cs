using System.Web.Mvc;

namespace WebUI.Areas.Display
{
    public class DisplayAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Display";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Display_default",
                "Display/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "WebUI.Areas.Display.Controllers" }
            );
        }
    }
}