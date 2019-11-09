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
    public class EFReceivingFuelRW : IRepository<ReceivingFuelRW>
    {

        private EFDbContext db;

        public EFReceivingFuelRW(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<ReceivingFuelRW> Get()
        {
            try
            {
                return db.Select<ReceivingFuelRW>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ReceivingFuelRW Get(int id)
        {
            try
            {
                return db.Select<ReceivingFuelRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(ReceivingFuelRW item)
        {
            try
            {
                db.Insert<ReceivingFuelRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(ReceivingFuelRW item)
        {
            try
            {
                db.Update<ReceivingFuelRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(ReceivingFuelRW item)
        {
            try
            {
                ReceivingFuelRW dbEntry = db.ReceivingFuelRW.Find(item.id);
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
                ReceivingFuelRW item = db.Delete<ReceivingFuelRW>(id);
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

        public ReceivingFuelRW Refresh(ReceivingFuelRW item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ReceivingFuelRW>(item.id);
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
