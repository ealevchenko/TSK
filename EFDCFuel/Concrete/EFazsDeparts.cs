using EFDCFuel.Abstract;
using EFDCFuel.Entities;
using EFDCFuel.Concrete;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFDCFuel.Concrete
{

    public class EFazsDeparts : IRepository<azsDeparts>
    {

        public EFDbContext db;

        public EFazsDeparts(EFDbContext db)
        {

            this.db = db;
        }

        public EFazsDeparts()
        {

            this.db = new EFDbContext();
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<azsDeparts> Get()
        {
            try
            {
                return db.Select<azsDeparts>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public azsDeparts Get(int id)
        {
            try
            {
                return db.Select<azsDeparts>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(azsDeparts item)
        {
            try
            {
                db.Insert<azsDeparts>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(azsDeparts item)
        {
            try
            {
                db.Update<azsDeparts>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(azsDeparts item)
        {
            try
            {
                azsDeparts dbEntry = db.azsDeparts.Find(item.id);
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
                azsDeparts item = db.Delete<azsDeparts>(id);
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

        public azsDeparts Refresh(azsDeparts item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<azsDeparts>(item.id);
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
