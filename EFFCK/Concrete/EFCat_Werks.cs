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
    public class EFCat_Werks : IRepository<Cat_Werks>
    {

        private EFDbContext db;

        public EFCat_Werks(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Cat_Werks> Get()
        {
            try
            {
                return db.Select<Cat_Werks>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Cat_Werks Get(int id)
        {
            try
            {
                return db.Select<Cat_Werks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Cat_Werks Get(string id)
        {
            try
            {
                return db.Select<Cat_Werks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Cat_Werks item)
        {
            try
            {
                db.Insert<Cat_Werks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Cat_Werks item)
        {
            try
            {
                db.Update<Cat_Werks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Cat_Werks item)
        {
            try
            {
                Cat_Werks dbEntry = db.Cat_Werks.Find(item.id);
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
                Cat_Werks item = db.Delete<Cat_Werks>(id);
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

        public Cat_Werks Refresh(Cat_Werks item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Cat_Werks>(item.id);
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
