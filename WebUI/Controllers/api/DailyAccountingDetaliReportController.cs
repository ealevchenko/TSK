using EFFCK.Abstract;
using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/tsk/daily_accounting_detaly_report")]
    public class DailyAccountingDetaliReportController : ApiController
    {
        protected IRepository<Daily_Accounting_Detali_Report> ef_dadr;

        public DailyAccountingDetaliReportController(IRepository<Daily_Accounting_Detali_Report> dadr)
        {
            this.ef_dadr = dadr;
        }

        // GET: api/tsk/daily_accounting_detaly_report/date/2020-01-01T00:00:00/fuel_type/107000024
        [Route("date/{date:datetime}/fuel_type/{fuel_type:int}")]
        [ResponseType(typeof(Daily_Accounting_Detali_Report))]
        public IHttpActionResult GetDailyAccountingDetaliReport(DateTime date, int fuel_type)
        {
            try
            {
                List<Daily_Accounting_Detali_Report> list = this.ef_dadr
                    .Get()
                    .Where(s => s.dt_start == date && s.fuel_type ==fuel_type)
                    .ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
