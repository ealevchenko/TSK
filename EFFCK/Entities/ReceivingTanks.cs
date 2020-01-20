namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ReceivingTanks
    {
        public int id { get; set; }

        public DateTime? dt { get; set; }

        public int id_table { get; set; }

        public int id_receiving_fuel { get; set; }

        [Required]
        [StringLength(5)]
        public string num { get; set; }

        public int fuel { get; set; }

        public DateTime start_datetime { get; set; }

        public double start_level { get; set; }

        public double? start_volume { get; set; }

        public double start_density { get; set; }

        public double? start_density_avg { get; set; }

        public double start_mass { get; set; }

        public double start_temp { get; set; }

        public double start_water_level { get; set; }

        public DateTime? stop_datetime { get; set; }

        public double? stop_level { get; set; }

        public double? stop_volume { get; set; }

        public double? stop_density { get; set; }

        public double? stop_density_avg { get; set; }

        public double? stop_mass { get; set; }

        public double? stop_temp { get; set; }

        public double? stop_water_level { get; set; }

        public double? volume_received { get; set; }

        public double? dens_received { get; set; }

        public double? mass_received { get; set; }

        public double? temp_received { get; set; }

        public double? relation { get; set; }

        public double? ratio_vd { get; set; }

        public double? ratio_tv { get; set; }

        public double? dens15 { get; set; }

        public double? volume15 { get; set; }

        public double? mass15 { get; set; }
    }
}
