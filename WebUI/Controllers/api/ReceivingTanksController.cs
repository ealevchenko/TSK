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
    [RoutePrefix("api/tsk/receiving_tanks")]
    public class ReceivingTanksController : ApiController
    {
        protected IRepository<ReceivingTanks> ef_rf;

        public ReceivingTanksController(IRepository<ReceivingTanks> rf)
        {
            this.ef_rf = rf;
        }

        // Показать все приемы
        // GET: api/tsk/receiving_tanks/all
        [Route("all")]
        [ResponseType(typeof(ReceivingTanks))]
        public IHttpActionResult GetReceivingTanks()
        {
            try
            {
                List<ReceivingTanks> list = this.ef_rf.Get().ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetReceivingTanks()").SaveError(e);
                return NotFound();
            }
        }

        // Показать прием по id
        // GET: api/tsk/receiving_tanks/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(ReceivingTanks))]
        public IHttpActionResult GetReceivingTanks(int id)
        {
            try
            {
                ReceivingTanks fs = this.ef_rf.Get()
                    .Where(c => c.id == id)
                    .FirstOrDefault();
                if (fs == null)
                {
                    return NotFound();
                }
                return Ok(fs);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetReceivingTanks(id={0})", id).SaveError(e);
                return NotFound();
            }
        }

        // GET: api/tsk/receiving_tanks/start/2020-01-10T00:00:00/stop/2020-01-20T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(ReceivingTanks))]
        public IHttpActionResult GetReceivingTanks(DateTime start, DateTime stop)
        {
            try
            {
                List<ReceivingTanks> list = this.ef_rf
                    .Get()
                    .Where(s => s.start_datetime >= start && s.start_datetime <= stop)
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
