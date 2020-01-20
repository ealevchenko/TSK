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

        public virtual DbSet<Cat_Depots> Cat_Depots { get; set; }
        public virtual DbSet<Cat_Fuel> Cat_Fuel { get; set; }
        public virtual DbSet<Cat_OZM_GSM> Cat_OZM_GSM { get; set; }
        public virtual DbSet<Cat_Tanks> Cat_Tanks { get; set; }
        public virtual DbSet<Cat_TRK> Cat_TRK { get; set; }
        public virtual DbSet<Cat_Werks> Cat_Werks { get; set; }
        public virtual DbSet<Daily_Accounting_Detali_Report> Daily_Accounting_Detali_Report { get; set; }
        public virtual DbSet<Daily_Accounting_Report> Daily_Accounting_Report { get; set; }
        public virtual DbSet<DeliveryTanks> DeliveryTanks { get; set; }
        public virtual DbSet<FuelSale> FuelSale { get; set; }
        public virtual DbSet<Incomes> Incomes { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<ManualMode> ManualMode { get; set; }
        public virtual DbSet<Outcomes> Outcomes { get; set; }
        public virtual DbSet<ReceivingTanks> ReceivingTanks { get; set; }
        public virtual DbSet<Remains> Remains { get; set; }
        public virtual DbSet<RemainsTank> RemainsTank { get; set; }
        public virtual DbSet<RemainsTanks> RemainsTanks { get; set; }
        public virtual DbSet<Settings> Settings { get; set; }
        public virtual DbSet<UsersChanges> UsersChanges { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cat_Werks>()
                .HasMany(e => e.Cat_Depots)
                .WithRequired(e => e.Cat_Werks)
                .HasForeignKey(e => e.parent_id)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<DeliveryTanks>()
                .Property(e => e.passage)
                .IsFixedLength()
                .IsUnicode(false);

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
