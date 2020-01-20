namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Cat_Tanks
    {
        [StringLength(3)]
        public string id { get; set; }

        [Required]
        [StringLength(10)]
        public string unified_number { get; set; }

        [Required]
        [StringLength(100)]
        public string address { get; set; }

        [Required]
        [StringLength(100)]
        public string type_name { get; set; }

        [Required]
        [StringLength(10)]
        public string serial_number { get; set; }

        public DateTime input_date { get; set; }

        public double capacity { get; set; }

        [Required]
        [StringLength(50)]
        public string level_meters_model { get; set; }

        [Required]
        [StringLength(10)]
        public string level_meters_serial_number { get; set; }

        [Required]
        [StringLength(10)]
        public string uniform_umber_tank { get; set; }

        [StringLength(100)]
        public string description { get; set; }
    }
}
