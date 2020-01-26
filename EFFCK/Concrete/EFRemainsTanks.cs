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
    public class EFRemainsTanks : IRepository<RemainsTanks>
    {

        private EFDbContext db;

        public EFRemainsTanks(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<RemainsTanks> Get()
        {
            try
            {
                return db.Select<RemainsTanks>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RemainsTanks Get(int id)
        {
            try
            {
                return db.Select<RemainsTanks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public RemainsTanks Get(string id)
        {
            try
            {
                return db.Select<RemainsTanks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(RemainsTanks item)
        {
            try
            {
                db.Insert<RemainsTanks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(RemainsTanks item)
        {
            try
            {
                db.Update<RemainsTanks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(RemainsTanks item)
        {
            try
            {
                RemainsTanks dbEntry = db.RemainsTanks.Find(item.id);
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
                RemainsTanks item = db.Delete<RemainsTanks>(id);
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

        public RemainsTanks Refresh(RemainsTanks item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<RemainsTanks>(item.id);
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
