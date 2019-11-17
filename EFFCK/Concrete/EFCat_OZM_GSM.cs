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
    public class EFCat_OZM_GSM : IRepository<Cat_OZM_GSM>
    {

        private EFDbContext db;

        public EFCat_OZM_GSM(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<Cat_OZM_GSM> Get()
        {
            try
            {
                return db.Select<Cat_OZM_GSM>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Cat_OZM_GSM Get(int id)
        {
            try
            {
                return db.Select<Cat_OZM_GSM>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Cat_OZM_GSM Get(string id)
        {
            try
            {
                return db.Select<Cat_OZM_GSM>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(Cat_OZM_GSM item)
        {
            try
            {
                db.Insert<Cat_OZM_GSM>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(Cat_OZM_GSM item)
        {
            try
            {
                db.Update<Cat_OZM_GSM>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(Cat_OZM_GSM item)
        {
            try
            {
                Cat_OZM_GSM dbEntry = db.Cat_OZM_GSM.Find(item.id);
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
                Cat_OZM_GSM item = db.Delete<Cat_OZM_GSM>(id);
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

        public Cat_OZM_GSM Refresh(Cat_OZM_GSM item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<Cat_OZM_GSM>(item.id);
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
