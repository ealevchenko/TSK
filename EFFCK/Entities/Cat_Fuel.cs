namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Cat_Fuel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int type_fuel { get; set; }

        [Required]
        [StringLength(30)]
        public string name { get; set; }

        [Required]
        [StringLength(10)]
        public string ukt_zed { get; set; }

        [StringLength(100)]
        public string description { get; set; }
    }
}
