namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Daily_Accounting_Report
    {
        public int id { get; set; }

        public int? type { get; set; }

        [StringLength(10)]
        public string ukt_zed { get; set; }

        [StringLength(30)]
        public string fuel_name { get; set; }

        public DateTime? date_start { get; set; }

        public DateTime? date_stop { get; set; }

        public double? volume_start { get; set; }

        public double? mass_start { get; set; }

        public double? dens_start { get; set; }

        public double? temp_start { get; set; }

        public double? volume15_start { get; set; }

        public double? mass15_start { get; set; }

        public double? dens15_start { get; set; }

        public int? volume_received { get; set; }

        public double? mass_received { get; set; }

        public double? dens_received { get; set; }

        public double? temp_received { get; set; }

        public double? volume15_received { get; set; }

        public double? mass15_received { get; set; }

        public double? dens15_received { get; set; }

        public int? volume_delivery { get; set; }

        public double? mass_delivery { get; set; }

        public double? dens_delivery { get; set; }

        public double? temp_delivery { get; set; }

        public double? volume15_delivery { get; set; }

        public double? mass15_delivery { get; set; }

        public double? dens15_delivery { get; set; }

        public double? volume_stop { get; set; }

        public double? mass_stop { get; set; }

        public double? dens_stop { get; set; }

        public double? temp_stop { get; set; }

        public double? volume15_stop { get; set; }

        public double? mass15_stop { get; set; }

        public double? dens15_stop { get; set; }

        public double? permissible_volume15_error { get; set; }

        public double? permissible_mass15_error { get; set; }
    }
}
