using EFFCK.Abstract;
using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/tsk/remains_tanks")]
    public class RemainsTanksController : ApiController
    {
        protected IRepository<RemainsTanks> ef_rt;

        public RemainsTanksController(IRepository<RemainsTanks> rt)
        {
            this.ef_rt = rt;
        }
    }
}
