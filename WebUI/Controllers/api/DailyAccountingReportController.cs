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
    [RoutePrefix("api/tsk/daily_accounting_report")]
    public class DailyAccountingReportController : ApiController
    {
        protected IRepository<Daily_Accounting_Report> ef_dar;

        public DailyAccountingReportController(IRepository<Daily_Accounting_Report> dar)
        {
            this.ef_dar = dar;
        }

        // GET: api/tsk/daily_accounting_report/start/2020-01-01T00:00:00/stop/2020-01-19T00:00:00
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(Daily_Accounting_Report))]
        public IHttpActionResult GetDailyAccountingReport(DateTime start, DateTime stop)
        {
            try
            {
                List<Daily_Accounting_Report> list = this.ef_dar
                    .Get()
                    .Where(s => s.date_start >= start && s.date_start <= stop)
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
