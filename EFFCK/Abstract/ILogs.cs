using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFFCK.Abstract
{
    public interface ILogs
    {
        Database Database { get; }
        IQueryable<Logs> Logs { get; }
        IQueryable<Logs> GetLogs();
        Logs GetLogs(long ID);
        IQueryable<Logs> GetLogsLastLines(int lines);
        long AddLogs(Logs Logs);
    }
}
