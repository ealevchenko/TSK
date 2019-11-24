namespace EFDCFuel.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class azsDeparts
    {
        [StringLength(5)]
        public string id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }
    }
}
