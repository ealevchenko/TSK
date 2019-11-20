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
    [RoutePrefix("api/sap")]
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

        // GET: api/sap/supply/post/8000000020
        [Route("supply/post/{post}")]
        [ResponseType(typeof(Supply))]
        public IHttpActionResult GetSupply(string post)
        {
            try
            {
                List<Supply> list_sypply = sap.GetSupply(post);
                if (list_sypply == null)
                {
                    return NotFound();
                }
                return Ok(list_sypply);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/sap/reservation_matrn/num/4364606/matrn/000000000107000024/mode/2
        [Route("reservation_matrn/num/{num}/matrn/{matrn}/mode/{mode}")]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservationMatrn(string num, string matrn, string mode)
        {
            try
            {
                List<Reservation> reservation = sap.GetReservationMatrn(num, matrn, mode);
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

        // GET: api/sap/reservation/num_dopusk/435/mode/5
        [Route("reservation/num_dopusk/{num}/mode/{mode}")]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservationOfNDopusk(string num, string mode)
        {
            try
            {
                Reservation reservation = sap.GetReservationOfNDopusk(num, mode);
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
