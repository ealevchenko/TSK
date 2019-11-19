using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ClientSAPTRK;
using MessageLog;

namespace WebUI.Controllers.api
{
    public class SAPController : ApiController
    {
        ClientSAP sap = new ClientSAP();

        public SAPController()
        {

        }

        // GET: api/sap/reservation/value/125.55/mass/100.66/debitor/101852/ozm/107000024/mode/5
        [Route("reservation/value/{valume:double}/mass/{mass:double}/debitor/{debitor}/ozm/{ozm}/mode/{mode}")]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservationOfValueMassDebitor(double valume, double mass, string debitor, string ozm, string mode)
        {
            try
            {
                Reservation reservation = sap.GetReservationOfValumeMassDebitor(valume, mass, debitor, ozm, mode);
                if (reservation == null)
                {
                    return NotFound();
                }
                return Ok(reservation);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
    }
}
