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
    [RoutePrefix("api/tsk/fuel_sale")]
    public class FuelSaleController : ApiController
    {
        protected IRepository<FuelSale> ef_fs;

        public FuelSaleController(IRepository<FuelSale> fs)
        {
            this.ef_fs = fs;
        }

        // Показать все выдачи
        // GET: api/tsk/fuel_sale/all
        [Route("all")]
        [ResponseType(typeof(FuelSale))]
        public IHttpActionResult GetFuelSale()
        {
            try
            {
                List<FuelSale> list = this.ef_fs.Get().ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetFuelSale()").SaveError(e);
                return NotFound();
            }
        }

        // Показать выдачу по id
        // GET: api/tsk/fuel_sale/id/1
        [Route("id/{id:int}")]
        [ResponseType(typeof(FuelSale))]
        public IHttpActionResult GetFuelSale(int id)
        {
            try
            {
                FuelSale fs = this.ef_fs.Get()
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
                String.Format("Ошибка выполнения метода API:GetFuelSale(id={0})", id).SaveError(e);
                return NotFound();
            }
        }

        // Показать открыты выдачу по id
        // GET: api/tsk/fuel_sale/open/num/1
        [Route("open/num/{num:int}")]
        [ResponseType(typeof(FuelSale))]
        public IHttpActionResult GetOpenFuelSale(int num)
        {
            try
            {
                FuelSale fs = this.ef_fs.Get()
                    .Where(c => c.Out_Type == num & (c.Start_Date == null | c.End_Date == null))
                    .FirstOrDefault();
                //if (fs == null)
                //{
                //    return NotFound();
                //}
                return Ok(fs);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetOpenFuelSale(num={0})", num).SaveError(e);
                return NotFound();
            }
        }

        // POST api/tsk/fuel_sale
        [HttpPost]
        [Route("")]
        public int PostFuelSale([FromBody]FuelSale value)
        {
            try
            {
                this.ef_fs.Add(value);
                this.ef_fs.Save();
                this.ef_fs.Refresh(value);
                return value.id;
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:PostFuelSale(value={0})", value).SaveError(e);
                return -1;
            }
        }

        // GET: api/tsk/fuel_sale/start/2020-01-10T00:00:00/stop/2020-01-20T23:59:59
        [Route("start/{start:datetime}/stop/{stop:datetime}")]
        [ResponseType(typeof(FuelSale))]
        public IHttpActionResult GetFuelSale(DateTime start, DateTime stop)
        {
            try
            {
                List<FuelSale> list = this.ef_fs
                    .Get()
                    .Where(s => s.Start_Date >= start && s.End_Date <= stop)
                    .ToList();
                //if (list == null)
                //{
                //    return NotFound();
                //}
                return Ok(list);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
