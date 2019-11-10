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
    public class EFUsersChanges : IRepository<UsersChanges>
    {

        private EFDbContext db;

        public EFUsersChanges(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<UsersChanges> Get()
        {
            try
            {
                return db.Select<UsersChanges>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public UsersChanges Get(int id)
        {
            try
            {
                return db.Select<UsersChanges>(id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public void Add(UsersChanges item)
        {
            try
            {
                db.Insert<UsersChanges>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void Update(UsersChanges item)
        {
            try
            {
                db.Update<UsersChanges>(item);
            }
            catch (Exception e)
            {

            }
        }

        public void AddOrUpdate(UsersChanges item)
        {
            try
            {
                UsersChanges dbEntry = db.UsersChanges.Find(item.id);
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
                UsersChanges item = db.Delete<UsersChanges>(id);
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

        public UsersChanges Refresh(UsersChanges item)
        {
            try
            {
                db.Entry(item).State = EntityState.Detached;
                return db.Select<UsersChanges>(item.id);
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
