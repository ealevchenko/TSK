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
    public class EFDaily_Accounting_Report : IRepository<Daily_Accounting_Report>
    {

        private EFDbContext db;

        public EFDaily_Accounting_Report(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Daily_Accounting_Report> Get()
        {
            try
            {
                return db.Select<Daily_Accounting_Report>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Daily_Accounting_Report Get(int id)
        {
            try
            {
                return db.Select<Daily_Accounting_Report>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Daily_Accounting_Report Get(string id)
        {
            try
            {
                return db.Select<Daily_Accounting_Report>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Daily_Accounting_Report item)
        {
            try
            {
                db.Insert<Daily_Accounting_Report>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Daily_Accounting_Report item)
        {
            try
            {
                db.Update<Daily_Accounting_Report>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Daily_Accounting_Report item)
        {
            try
            {
                Daily_Accounting_Report dbEntry = db.Daily_Accounting_Report.Find(item.id);
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
                Daily_Accounting_Report item = db.Delete<Daily_Accounting_Report>(id);
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

        public Daily_Accounting_Report Refresh(Daily_Accounting_Report item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Daily_Accounting_Report>(item.id);
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
