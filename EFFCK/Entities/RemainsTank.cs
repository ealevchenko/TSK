namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RemainsTank")]
    public partial class RemainsTank
    {
        public int id { get; set; }

        public DateTime? date { get; set; }

        public double? level { get; set; }

        public double? volume { get; set; }

        public double? mass { get; set; }

        public double? dens_avg { get; set; }

        public double? dens_calc { get; set; }

        public double? temp_avg { get; set; }

        public double? water { get; set; }
    }
}
