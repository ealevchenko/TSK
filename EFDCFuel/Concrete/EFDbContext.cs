namespace EFDCFuel.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFDCFuel.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=dc_fuel")
        {
        }

        public virtual DbSet<azsCards> azsCards { get; set; }
        public virtual DbSet<azsDeparts> azsDeparts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

        }
    }
}
