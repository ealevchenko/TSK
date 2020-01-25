using EFFCK.Abstract;
using EFFCK.Entities;
using MessageLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/tsk/receiving_fuel")]
    public class ReceivingFuelController : ApiController
    {
        protected IReceivingFuel ef_rf;

        public ReceivingFuelController(IReceivingFuel rf)
        {
            this.ef_rf = rf;
        }

        // GET: api/tsk/receiving_fuel/start/2019-12-10T00:00:00/stop/2020-01-20T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ReceivingFuel))]
        public IHttpActionResult GetReceivingFuel(DateTime start, DateTime stop)
        {
            try
            {
                List<ReceivingFuel> list = this.ef_rf.GetReceivingFuel(start,stop).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
