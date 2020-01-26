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
    public class CurrentRemainsTank
    {
        public DateTime? date { get; set; }

        public double? level { get; set; }

        public double? volume { get; set; }

        public double? mass { get; set; }

        public double? dens_avg { get; set; }

        public double? dens_calc { get; set; }

        public double? temp_avg { get; set; }

        public double? water { get; set; }
    }

    [RoutePrefix("api/tsk/remains_tank")]
    public class RemainsTankController : ApiController
    {
        protected IRepository<RemainsTank> ef_rt;

        public RemainsTankController(IRepository<RemainsTank> rt)
        {
            this.ef_rt = rt;
        }

        // GET: api/tsk/remains_tank/current
        [Route("current")]
        [ResponseType(typeof(CurrentRemainsTank))]
        public IHttpActionResult GetCurrentRemainsTank()
        {
            try
            {
                List<CurrentRemainsTank> list = this.ef_rt.Database.SqlQuery<CurrentRemainsTank>("EXEC [dbo].[getCurrentRemains]").ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET: api/tsk/remains_tank/start/2020-01-01T00:00:00/stop/2020-01-19T00:00:00
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(RemainsTank))]
        public IHttpActionResult GetRemainsTank(DateTime start, DateTime stop)
        {
            try
            {
                List<RemainsTank> list = this.ef_rt
                    .Get()
                    .Where(s => s.date >= start && s.date <= stop)
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
