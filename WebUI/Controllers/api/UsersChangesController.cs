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
    [RoutePrefix("api/tsk/users_changes")]
    public class UsersChangesController : ApiController
    {
        protected IRepository<UsersChanges> ef_uc;

        public UsersChangesController(IRepository<UsersChanges> uc)
        {
            this.ef_uc = uc;
        }

        // GET: api/tsk/users_changes/all
        [Route("all")]
        [ResponseType(typeof(UsersChanges))]
        public IHttpActionResult GetUsersChanges()
        {
            try
            {
                List<UsersChanges> list = this.ef_uc.Get().ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/tsk/users_changes/last
        [Route("last")]
        [ResponseType(typeof(UsersChanges))]
        public IHttpActionResult GetLastUsersChanges()
        {
            try
            {
                UsersChanges user_changes = this.ef_uc.Get().OrderByDescending(u=>u.id).FirstOrDefault();
                if (user_changes == null)
                {
                    return NotFound();
                }
                return Ok(user_changes);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

    }
}
