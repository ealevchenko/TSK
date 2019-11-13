namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Settings
    {
        [Key]
        [StringLength(20)]
        public string key { get; set; }

        [Required]
        [StringLength(20)]
        public string value { get; set; }
    }
}
