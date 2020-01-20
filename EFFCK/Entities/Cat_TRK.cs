namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Cat_TRK
    {
        public int id { get; set; }

        [Required]
        [StringLength(20)]
        public string name { get; set; }

        public int num { get; set; }

        [Required]
        [StringLength(50)]
        public string name_gas_station { get; set; }

        public int type_fuel { get; set; }

        [StringLength(10)]
        public string serial_number_flowmeter { get; set; }

        [StringLength(10)]
        public string identification_number_flowmeter { get; set; }

        public bool active { get; set; }

        [StringLength(100)]
        public string description { get; set; }
    }
}
