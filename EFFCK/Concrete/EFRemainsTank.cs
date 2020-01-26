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
    public class EFRemainsTank : IRepository<RemainsTank>
    {

        private EFDbContext db;

        public EFRemainsTank(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<RemainsTank> Get()
        {
            try
            {
                return db.Select<RemainsTank>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RemainsTank Get(int id)
        {
            try
            {
                return db.Select<RemainsTank>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RemainsTank Get(string id)
        {
            try
            {
                return db.Select<RemainsTank>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(RemainsTank item)
        {
            try
            {
                db.Insert<RemainsTank>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(RemainsTank item)
        {
            try
            {
                db.Update<RemainsTank>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(RemainsTank item)
        {
            try
            {
                RemainsTank dbEntry = db.RemainsTank.Find(item.id);
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
                RemainsTank item = db.Delete<RemainsTank>(id);
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

        public RemainsTank Refresh(RemainsTank item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<RemainsTank>(item.id);
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
