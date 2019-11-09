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
    public class EFRemainsTanksRW : IRepository<RemainsTanksRW>
    {

        private EFDbContext db;

        public EFRemainsTanksRW(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<RemainsTanksRW> Get()
        {
            try
            {
                return db.Select<RemainsTanksRW>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RemainsTanksRW Get(int id)
        {
            try
            {
                return db.Select<RemainsTanksRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(RemainsTanksRW item)
        {
            try
            {
                db.Insert<RemainsTanksRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(RemainsTanksRW item)
        {
            try
            {
                db.Update<RemainsTanksRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(RemainsTanksRW item)
        {
            try
            {
                RemainsTanksRW dbEntry = db.RemainsTanksRW.Find(item.id);
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
                RemainsTanksRW item = db.Delete<RemainsTanksRW>(id);
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

        public RemainsTanksRW Refresh(RemainsTanksRW item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<RemainsTanksRW>(item.id);
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
