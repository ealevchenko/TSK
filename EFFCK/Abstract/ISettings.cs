using EFFCK.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFFCK.Abstract
{
    public interface ISettings
    {
        Database Database { get; }

        IQueryable<Settings> Get();        
        Settings Get(string Key);

        void Add(Settings Settings);            // создание объекта
        void Update(Settings Settings);         // создание объекта
        void Delete(string Key);                // удаление объекта по id
        int Save();                             // сохранение изменений в базе
        Settings Refresh(Settings Settings);    // Обновить объект с базаой
    }
}
