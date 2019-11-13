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

    }
}
