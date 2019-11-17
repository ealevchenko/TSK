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
    public class EFDaily_ReportRW : IRepository<Daily_ReportRW>
    {

        private EFDbContext db;

        public EFDaily_ReportRW(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Daily_ReportRW> Get()
        {
            try
            {
                return db.Select<Daily_ReportRW>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Daily_ReportRW Get(int id)
        {
            try
            {
                return db.Select<Daily_ReportRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Daily_ReportRW Get(string id)
        {
            try
            {
                return db.Select<Daily_ReportRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Daily_ReportRW item)
        {
            try
            {
                db.Insert<Daily_ReportRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Daily_ReportRW item)
        {
            try
            {
                db.Update<Daily_ReportRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Daily_ReportRW item)
        {
            try
            {
                Daily_ReportRW dbEntry = db.Daily_ReportRW.Find(item.id);
                if (dbEntry == null)
                {
                    Add(item);
                }
                else
                {
                    Update(item);
                }
            }
            catch (Exception e)
            {

            }

        }

        public void Delete(int id)
        {
            try
            {
                Daily_ReportRW item = db.Delete<Daily_ReportRW>(id);
            }
            catch (Exception e)
            {

            }
        }

        public int Save()
        {
            try
            {
                return db.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public Daily_ReportRW Refresh(Daily_ReportRW item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Daily_ReportRW>(item.id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
