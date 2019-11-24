using ClientOPCTRK;
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
    [RoutePrefix("api/tsk/opc")]
    public class OPCController : ApiController
    {
        ClientTRK client = new ClientTRK();

        public OPCController(){
        
        }

        // GET: api/tsk/opc/rfid
        [Route("rfid")]
        [ResponseType(typeof(RFID))]
        public IHttpActionResult GetReadTagsRFID()
        {
            try
            {
                RFID rfid = client.ReadTagsRFID(true);
                if (rfid == null)
                {
                    return NotFound();
                }
                return Ok(rfid);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetReadTagsRFID()").SaveError(e);
                return NotFound();
            }
        }

        // GET: api/tsk/opc/tank
        [Route("tank")]
        [ResponseType(typeof(Tank))]
        public IHttpActionResult GetReadTagsTank()
        {
            try
            {
                Tank tank = client.ReadTagsTank();
                if (tank == null)
                {
                    return NotFound();
                }
                return Ok(tank);
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetReadTagsTank()").SaveError(e);
                return NotFound();
            }
        }
    }
}
