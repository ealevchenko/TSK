namespace EFFCK.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Outcomes
    {
        public int id { get; set; }

        public int Out_Type { get; set; }

        [Required]
        [StringLength(50)]
        public string Tr_nom { get; set; }

        [Required]
        [StringLength(50)]
        public string Card_Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Debitor { get; set; }

        [Required]
        [StringLength(50)]
        public string Nakl_Nom { get; set; }

        public double Target_Volume { get; set; }

        public double Target_Dens { get; set; }

        public double Target_Mass { get; set; }

        [Required]
        [StringLength(50)]
        public string User { get; set; }

        public DateTime Crated_Date { get; set; }

        public int? Start_Counter { get; set; }

        public double? Start_Level { get; set; }

        public double? Start_Volume { get; set; }

        public double? Start_Mass { get; set; }

        public double? Start_Dens { get; set; }

        public double? Start_Temp { get; set; }

        public double? Start_Water { get; set; }

        public DateTime? Start_Date { get; set; }

        public int? End_Counter { get; set; }

        public double? End_Level { get; set; }

        public double? End_Volume { get; set; }

        public double? End_Mass { get; set; }

        public double? End_Dens { get; set; }

        public double? End_Temp { get; set; }

        public double? End_Water { get; set; }

        public DateTime? End_Date { get; set; }
    }
}
