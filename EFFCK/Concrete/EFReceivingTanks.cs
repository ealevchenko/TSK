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
    public class EFReceivingTanks : IRepository<ReceivingTanks>
    {

        private EFDbContext db;

        public EFReceivingTanks(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<ReceivingTanks> Get()
        {
            try
            {
                return db.Select<ReceivingTanks>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ReceivingTanks Get(int id)
        {
            try
            {
                return db.Select<ReceivingTanks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ReceivingTanks Get(string id)
        {
            try
            {
                return db.Select<ReceivingTanks>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(ReceivingTanks item)
        {
            try
            {
                db.Insert<ReceivingTanks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(ReceivingTanks item)
        {
            try
            {
                db.Update<ReceivingTanks>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(ReceivingTanks item)
        {
            try
            {
                ReceivingTanks dbEntry = db.ReceivingTanks.Find(item.id);
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
                ReceivingTanks item = db.Delete<ReceivingTanks>(id);
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

        public ReceivingTanks Refresh(ReceivingTanks item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<ReceivingTanks>(item.id);
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
