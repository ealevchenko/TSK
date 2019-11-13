﻿using EFFCK.Abstract;
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
    [RoutePrefix("api/tsk/setting")]
    public class SettingsController : ApiController
    {
        protected ISettings ef_sett;

        public SettingsController(ISettings sett)
        {
            this.ef_sett = sett;
        }

        // Показать выдачу по id
        // GET: api/tsk/setting/display_fd
        [Route("display_fd")]
        [ResponseType(typeof(int))]
        public IHttpActionResult GetSettingDisplay_fd()
        {
            try
            {
                Settings setting = this.ef_sett.Get("display_fd");
                if (setting == null)
                {
                    return NotFound();
                }
                return Ok(int.Parse(setting.value));
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:GetSettingDisplay_fd()").SaveError(e);
                return NotFound();
            }
        }

        // POST api/tsk/setting/display_fd
        [HttpPost]
        [Route("display_fd")]
        public string PostSettingDisplay_fd([FromBody]Settings value)
        {
            try
            {
                this.ef_sett.Add(value);
                this.ef_sett.Save();
                this.ef_sett.Refresh(value);
                return value.key;
            }
            catch (Exception e)
            {
                String.Format("Ошибка выполнения метода API:PostSettingDisplay_fd(value={0})", value).SaveError(e);
                return "-1";
            }
        }
    }
}
