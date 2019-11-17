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
    public class EFCat_Depots : IRepository<Cat_Depots>
    {

        private EFDbContext db;

        public EFCat_Depots(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Cat_Depots> Get()
        {
            try
            {
                return db.Select<Cat_Depots>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Cat_Depots Get(int id)
        {
            try
            {
                return db.Select<Cat_Depots>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public Cat_Depots Get(string id)
        {
            try
            {
                return db.Select<Cat_Depots>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }
        public void Add(Cat_Depots item)
        {
            try
            {
                db.Insert<Cat_Depots>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Cat_Depots item)
        {
            try
            {
                db.Update<Cat_Depots>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Cat_Depots item)
        {
            try
            {
                Cat_Depots dbEntry = db.Cat_Depots.Find(item.id);
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
                Cat_Depots item = db.Delete<Cat_Depots>(id);
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

        public Cat_Depots Refresh(Cat_Depots item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Cat_Depots>(item.id);
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
