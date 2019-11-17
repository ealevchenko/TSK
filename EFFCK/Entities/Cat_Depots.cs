namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Cat_Depots
    {
        [Key]
        [Column(Order = 0)]
        [StringLength(4)]
        public string id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(4)]
        public string parent_id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        public virtual Cat_Werks Cat_Werks { get; set; }
    }
}
