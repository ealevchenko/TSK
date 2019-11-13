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
    public class EFFuelSale : IRepository<FuelSale>
    {

        private EFDbContext db;

        public EFFuelSale(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<FuelSale> Get()
        {
            try
            {
                return db.Select<FuelSale>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public FuelSale Get(int id)
        {
            try
            {
                return db.Select<FuelSale>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(FuelSale item)
        {
            try
            {
                db.Insert<FuelSale>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(FuelSale item)
        {
            try
            {
                db.Update<FuelSale>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(FuelSale item)
        {
            try
            {
                FuelSale dbEntry = db.FuelSale.Find(item.id);
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
                FuelSale item = db.Delete<FuelSale>(id);
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

        public FuelSale Refresh(FuelSale item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<FuelSale>(item.id);
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
