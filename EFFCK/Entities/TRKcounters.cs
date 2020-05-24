namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class TRKcounters
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public int trkBig { get; set; }

        public int trkSmall { get; set; }
    }
}
