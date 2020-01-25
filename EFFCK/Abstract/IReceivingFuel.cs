using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFFCK.Abstract
{
    public interface IReceivingFuel
    {
        Database Database { get; }

        IEnumerable<ReceivingFuel> GetReceivingFuel(DateTime start, DateTime stop);
    }
}
