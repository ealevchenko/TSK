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
    public class EFFuelSaleRW : IRepository<FuelSaleRW>
    {

        private EFDbContext db;

        public EFFuelSaleRW(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<FuelSaleRW> Get()
        {
            try
            {
                return db.Select<FuelSaleRW>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public FuelSaleRW Get(int id)
        {
            try
            {
                return db.Select<FuelSaleRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public FuelSaleRW Get(string id)
        {
            try
            {
                return db.Select<FuelSaleRW>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(FuelSaleRW item)
        {
            try
            {
                db.Insert<FuelSaleRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(FuelSaleRW item)
        {
            try
            {
                db.Update<FuelSaleRW>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(FuelSaleRW item)
        {
            try
            {
                FuelSaleRW dbEntry = db.FuelSaleRW.Find(item.id);
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
                FuelSaleRW item = db.Delete<FuelSaleRW>(id);
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

        public FuelSaleRW Refresh(FuelSaleRW item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<FuelSaleRW>(item.id);
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
