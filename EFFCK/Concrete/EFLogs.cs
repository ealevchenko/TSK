using EFFCK.Abstract;
using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFFCK.Concrete
{
    public class EFLogs : ILogs
    {

        private EFDbContext db;

        public EFLogs(EFDbContext db)
        {
            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IQueryable<Logs> Logs
        {
            get { return db.Logs; }
        }

        public long AddLogs(Logs Logs)
        {
            try
            {
                Logs new_logs = new Logs()
                {
                    ID = 0,
                    DateTime = Logs.DateTime,
                    UserName = Logs.UserName,
                    Level = Logs.Level,
                    Log = Logs.Log
                };
                db.Logs.Add(new_logs);
                db.SaveChanges();
                return new_logs.ID;
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public IQueryable<Logs> GetLogs()
        {
            try
            {
                return Logs;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Logs GetLogs(long ID)
        {
            try
            {
                return Logs.Where(c => c.ID == ID).FirstOrDefault();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IQueryable<Logs> GetLogsLastLines(int lines)
        {
            try
            {
                return Logs.OrderByDescending(l => l.ID).Take(lines);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
