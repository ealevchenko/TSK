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
    [RoutePrefix("api/tsk/catalog")]
    public class CatalogController : ApiController
    {
        protected IRepository<Cat_Depots> ef_dep;
        protected IRepository<Cat_OZM_GSM> ef_ozm;
        protected IRepository<Cat_Werks> ef_werks;

        public CatalogController(IRepository<Cat_Depots> dep, IRepository<Cat_OZM_GSM> ozm, IRepository<Cat_Werks> werks)
        {
            this.ef_dep = dep;
            this.ef_ozm = ozm;
            this.ef_werks = werks;
        }

        // GET: api/tsk/catalog/ozm/id/107000024
        [Route("ozm/id/{id}")]
        [ResponseType(typeof(Cat_OZM_GSM))]
        public IHttpActionResult GetCat_OZM(string id)
        {
            try
            {
                Cat_OZM_GSM ozm = this.ef_ozm.Get(id);
                if (ozm == null)
                {
                    return NotFound();
                }
                return Ok(ozm);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/tsk/catalog/ozm/all
        [Route("ozm/all")]
        [ResponseType(typeof(Cat_OZM_GSM))]
        public IHttpActionResult GetCat_OZM_GSM()
        {
            try
            {
                List<Cat_OZM_GSM> ozms = this.ef_ozm.Get().ToList();
                if (ozms == null)
                {
                    return NotFound();
                }
                return Ok(ozms);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/tsk/catalog/depots/id/211
        [Route("depots/id/{id}")]
        [ResponseType(typeof(Cat_Depots))]
        public IHttpActionResult GetCat_Depots(string id)
        {
            try
            {
                Cat_Depots depots = this.ef_dep.Get().Where(c => c.id == id)
                    .ToList().
                    Select(c => new Cat_Depots
                    {
                        id = c.id,
                        name = c.name,
                        parent_id = c.parent_id,
                        Cat_Werks = new Cat_Werks
                        {
                            id = c.Cat_Werks.id,
                            name = c.Cat_Werks.name
                        }
                    }).FirstOrDefault();
                if (depots == null)
                {
                    return NotFound();
                }
                return Ok(depots);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/tsk/catalog/depots/all
        [Route("depots/all")]
        [ResponseType(typeof(Cat_Depots))]
        public IHttpActionResult GetCat_Depots()
        {
            try
            {
                List<Cat_Depots> depots = this.ef_dep.Get()
                    .ToList().
                    Select(c => new Cat_Depots
                    {
                        id = c.id,
                        name = c.name,
                        parent_id = c.parent_id,
                        Cat_Werks = new Cat_Werks
                        {
                            id = c.Cat_Werks.id,
                            name = c.Cat_Werks.name
                        }
                    }).ToList();
                if (depots == null)
                {
                    return NotFound();
                }
                return Ok(depots);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/tsk/catalog/werks/all
        [Route("werks/all")]
        [ResponseType(typeof(Cat_Werks))]
        public IHttpActionResult GetCat_Werks()
        {
            try
            {
                List<Cat_Werks> depots = this.ef_werks.Get()
                    .ToList()
                    .Select(c => new Cat_Werks
                    {
                        id = c.id,
                        name = c.name
                    })
                    .ToList();
                if (depots == null)
                {
                    return NotFound();
                }
                return Ok(depots);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
