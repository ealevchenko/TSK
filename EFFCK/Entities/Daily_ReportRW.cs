namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Daily_ReportRW
    {
        public int id { get; set; }

        [StringLength(10)]
        public string type { get; set; }

        public DateTime? date_start { get; set; }

        public DateTime? date_stop { get; set; }

        public int? volume_start { get; set; }

        public double? mass_start { get; set; }

        public double? dens_start { get; set; }

        public double? temp_start { get; set; }

        public int? volume15_start { get; set; }

        public double? mass15_start { get; set; }

        public double? dens15_start { get; set; }

        public int? volume_coming { get; set; }

        public double? mass_coming { get; set; }

        public double? dens_coming { get; set; }

        public double? temp_coming { get; set; }

        public int? volume15_coming { get; set; }

        public double? mass15_coming { get; set; }

        public double? dens15_coming { get; set; }

        public int? volume_consumption { get; set; }

        public double? mass_consumption { get; set; }

        public double? dens_consumption { get; set; }

        public double? temp_consumption { get; set; }

        public int? volume15_consumption { get; set; }

        public double? mass15_consumption { get; set; }

        public double? dens15_consumption { get; set; }

        public int? volume_stop { get; set; }

        public double? mass_stop { get; set; }

        public double? dens_stop { get; set; }

        public double? temp_stop { get; set; }

        public int? volume15_stop { get; set; }

        public double? mass15_stop { get; set; }

        public double? dens15_stop { get; set; }

        public DateTime? send { get; set; }
    }
}
