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
    public class CurrentTRKcounters
    {
        public string count { get; set; }

        public int trkBigStart { get; set; }

        public int trkBigStop { get; set; }

        public int diff { get; set; }
    }

    [RoutePrefix("api/tsk/trk_counters")]
    public class TRKcountersController : ApiController
    {
        protected IRepository<TRKcounters> ef_con;

        public TRKcountersController(IRepository<TRKcounters> trk_con)
        {
            this.ef_con = trk_con;
        }

        //GET: api/tsk/trk_counters/start/2020-05-21T07:00:00/stop/2020-05-21T19:00:00
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(CurrentTRKcounters))]
        public IHttpActionResult GetTRKcounters(DateTime start, DateTime stop)
        {
            try
            {
                string sql = "EXEC [dbo].[Get_Counters] N'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "', N'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "'";
                List<CurrentTRKcounters> list = this.ef_con.Database.SqlQuery<CurrentTRKcounters>(sql).ToList();
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
