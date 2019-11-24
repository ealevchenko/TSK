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
    public class EFazsCards : IRepository<azsCards>
    {

        private EFDbContext db;

        public EFazsCards(EFDbContext db)
        {

            this.db = db;
        }

        public EFazsCards()
        {

            this.db = new EFDbContext();
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<azsCards> Get()
        {
            try
            {
                return db.Select<azsCards>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public azsCards Get(int id)
        {
            try
            {
                return db.Select<azsCards>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(azsCards item)
        {
            try
            {
                db.Insert<azsCards>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(azsCards item)
        {
            try
            {
                db.Update<azsCards>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(azsCards item)
        {
            try
            {
                azsCards dbEntry = db.azsCards.Find(item.Id);
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
                azsCards item = db.Delete<azsCards>(id);
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

        public azsCards Refresh(azsCards item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<azsCards>(item.Id);
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
