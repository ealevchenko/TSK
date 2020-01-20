namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class RemainsTanks
    {
        public int id { get; set; }

        public DateTime? dt { get; set; }

        public DateTime? dt_actual { get; set; }

        public int? fuel_type { get; set; }

        [StringLength(11)]
        public string tank { get; set; }

        public double? level { get; set; }

        public double? volume { get; set; }

        public double? dens { get; set; }

        public double? dens_avg { get; set; }

        public double? mass { get; set; }

        public double? temp { get; set; }

        public double? relation { get; set; }

        public double? ratio_vd { get; set; }

        public double? ratio_tv { get; set; }

        public double? dens15 { get; set; }

        public double? volume15 { get; set; }

        public double? mass15 { get; set; }
    }
}
