namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("FuelSaleRW")]
    public partial class FuelSaleRW
    {
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string operator_name { get; set; }

        public int? smena_num { get; set; }

        public DateTime? smena_datetime { get; set; }

        public int num { get; set; }

        public int fuel_type { get; set; }

        public int tank_num { get; set; }

        [Required]
        [StringLength(20)]
        public string number_card { get; set; }

        public int? id_card { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? dose { get; set; }

        [Required]
        [StringLength(1)]
        public string passage { get; set; }

        public int? volume { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? mass { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? dens { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? temp { get; set; }

        public int? volume15 { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? mass15 { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? dens15 { get; set; }

        public DateTime? start_datetime { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_level { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_volume { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_dens { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_mass { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_temp { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? start_water_level { get; set; }

        public int? start_counter { get; set; }

        public DateTime? stop_datetime { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_level { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_volume { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_density { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_mass { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_temp { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? stop_water_level { get; set; }

        public int? stop_counter { get; set; }

        [StringLength(20)]
        public string auto_number { get; set; }
    }
}
