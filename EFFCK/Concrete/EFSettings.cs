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
    public class EFSettings : ISettings
    {

        private EFDbContext db;

        public EFSettings(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public void Add(Settings Settings)
        {
            try
            {
                this.db.Entry(Settings).State = EntityState.Added;
            }
            catch (Exception e)
            {
                return;
            }
        }

        public void Delete(string Key)
        {
            Settings item = this.db.Set<Settings>().Find(Key);
            if (item != null)
                this.db.Entry<Settings>(item).State = EntityState.Deleted;
        }

        public IQueryable<Settings> Get()
        {
            try
            {
                return this.db.Set<Settings>();
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public Settings Get(string Key)
        {
            try
            {
                return this.db.Set<Settings>().Find(Key);
            }
            catch (Exception e)
            {
                return null;
            }            
        }

        public Settings Refresh(Settings Settings)
        {
            try
            {
                this.db.Entry(Settings).State = EntityState.Detached;
                return this.db.Set<Settings>().Find(Settings.key);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public int Save()
        {
            try
            {
                return this.db.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public void Update(Settings Settings)
        {
            try
            {
                this.db.Entry(Settings).State = EntityState.Modified;
            }
            catch (Exception e)
            {
                return;
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
