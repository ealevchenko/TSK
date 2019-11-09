namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Remains
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public decimal Level { get; set; }

        public decimal Volume { get; set; }

        public decimal Mass { get; set; }

        public decimal Dens { get; set; }

        public decimal Temp { get; set; }

        public decimal Water { get; set; }

        [Required]
        [StringLength(50)]
        public string User { get; set; }
    }
}
