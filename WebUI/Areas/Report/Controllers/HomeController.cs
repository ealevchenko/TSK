using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Areas.Report.Controllers
{
    public class HomeController : Controller
    {
        // Заправочная ведомость
        public ActionResult FuelSale()
        {
            return View();
        }

        // Суточный отчет
        public ActionResult DailyAccountingReport()
        {
            return View();
        }

        // Приемка топлива
        public ActionResult ReceivingFuel()
        {
            return View();
        }

    }
}