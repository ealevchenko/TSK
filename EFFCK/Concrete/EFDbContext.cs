namespace EFFCK.Concrete
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using EFFCK.Entities;

    public partial class EFDbContext : DbContext
    {
        public EFDbContext()
            : base("name=tsk")
        {
        }

        public virtual DbSet<Daily_ReportRW> Daily_ReportRW { get; set; }
        public virtual DbSet<FuelSaleRW> FuelSaleRW { get; set; }
        public virtual DbSet<ReceivingFuelRW> ReceivingFuelRW { get; set; }
        public virtual DbSet<RemainsTanksRW> RemainsTanksRW { get; set; }
        public virtual DbSet<Incomes> Incomes { get; set; }
        public virtual DbSet<ManualMode> ManualMode { get; set; }
        public virtual DbSet<Outcomes> Outcomes { get; set; }
        public virtual DbSet<Remains> Remains { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<UsersChanges> UsersChanges { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.dose)
                .HasPrecision(9, 3);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.passage)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.mass)
                .HasPrecision(10, 3);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.dens)
                .HasPrecision(9, 5);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.temp)
                .HasPrecision(3, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.mass15)
                .HasPrecision(10, 3);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.dens15)
                .HasPrecision(9, 5);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_level)
                .HasPrecision(7, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_volume)
                .HasPrecision(9, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_dens)
                .HasPrecision(9, 5);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_mass)
                .HasPrecision(9, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_temp)
                .HasPrecision(3, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.start_water_level)
                .HasPrecision(6, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_level)
                .HasPrecision(7, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_volume)
                .HasPrecision(9, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_density)
                .HasPrecision(9, 5);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_mass)
                .HasPrecision(9, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_temp)
                .HasPrecision(3, 1);

            modelBuilder.Entity<FuelSaleRW>()
                .Property(e => e.stop_water_level)
                .HasPrecision(6, 1);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Level)
                .HasPrecision(16, 1);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Volume)
                .HasPrecision(16, 3);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Mass)
                .HasPrecision(16, 3);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Dens)
                .HasPrecision(16, 1);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Temp)
                .HasPrecision(16, 1);

            modelBuilder.Entity<ManualMode>()
                .Property(e => e.Water)
                .HasPrecision(16, 1);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Level)
                .HasPrecision(16, 1);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Volume)
                .HasPrecision(16, 3);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Mass)
                .HasPrecision(16, 3);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Dens)
                .HasPrecision(16, 1);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Temp)
                .HasPrecision(16, 1);

            modelBuilder.Entity<Remains>()
                .Property(e => e.Water)
                .HasPrecision(16, 1);
        }
    }
}
