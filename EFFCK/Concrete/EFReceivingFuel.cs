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
    public class EFReceivingFuel: IReceivingFuel
    {
        private EFDbContext db;

        public EFReceivingFuel(EFDbContext db)
        {

            this.db = db;
        }

        public Database Database
        {
            get { return this.db.Database; }
        }

        public IEnumerable<ReceivingFuel> GetReceivingFuel(DateTime start, DateTime stop)
        {
            try
            {
                string sql = "select * from get_receiving_fuel(Convert(datetime,'" + start.ToString("yyyy-MM-dd HH:mm:ss") + "',120),Convert(datetime,'" + stop.ToString("yyyy-MM-dd HH:mm:ss") + "',120))";
                return db.Database.SqlQuery<ReceivingFuel>(sql).ToList();
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
