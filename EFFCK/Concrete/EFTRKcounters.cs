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
    public class EFTRKcounters : IRepository<TRKcounters>
    {

        private EFDbContext db;

        public EFTRKcounters(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<TRKcounters> Get()
        {
            try
            {
                return db.Select<TRKcounters>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TRKcounters Get(int id)
        {
            try
            {
                return db.Select<TRKcounters>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public TRKcounters Get(string id)
        {
            try
            {
                return db.Select<TRKcounters>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(TRKcounters item)
        {
            try
            {
                db.Insert<TRKcounters>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(TRKcounters item)
        {
            try
            {
                db.Update<TRKcounters>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(TRKcounters item)
        {
            try
            {
                TRKcounters dbEntry = db.TRKcounters.Find(item.Id);
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
                TRKcounters item = db.Delete<TRKcounters>(id);
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

        public TRKcounters Refresh(TRKcounters item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<TRKcounters>(item.Id);
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
