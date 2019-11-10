using System;
using MessageLog;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebUI.Controllers.api
{
    public class TSKLog
    {
        public long ID { get; set; }
        public DateTime DateTime { get; set; }
        public string UserName { get; set; }
        public int? Level { get; set; }
        public string Log { get; set; }
    }

    [RoutePrefix("api/log")]
    public class LogController : ApiController
    {

        public LogController()
        {

        }

        // POST api/log/add
        [HttpPost]
        [Route("add")]
        public long PostLog([FromBody]TSKLog value)
        {
            try
            {
                String mess = String.Format("[ CLIENT datetime: {0}, user : {1} ] Message - ({2})", value.DateTime, value.UserName, value.Log);
                switch (value.Level)
                {
                    case 0: mess.SaveInformation(); break;
                    case 1: mess.SaveWarning(); break;
                    case 2: mess.SaveError(); break;
                    case 3: mess.SaveDebug(); break;
                    case 4: mess.SaveInformation(); break;
                }
                return 1;
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:PostTRKLogs(value={0})", value).SaveError(e);
                return -1;
            }
        }
    }
}
